
import React, { useState } from 'react';
import { Search, Sparkles, Globe, UserPlus, Loader2, CheckCircle2, XCircle, Zap, AlertCircle, MapPin, ListOrdered, ClipboardCheck, Info } from 'lucide-react';

// MÄÄRITETTY WEBHOOK URL
const N8N_WEBHOOK_URL = 'https://ipmediat.app.n8n.cloud/webhook/octobound';

interface ScrapedLead {
  id: string;
  name: string;
  company: string;
  role: string;
  score: number;
  status: 'new' | 'qualifying' | 'qualified' | 'rejected';
  reason?: string;
  website?: string;
}

export const LeadAutomation: React.FC = () => {
  const [target, setTarget] = useState('');
  const [location, setLocation] = useState('');
  const [limit, setLimit] = useState('10');
  const [criteria, setCriteria] = useState('Etsi yrityksiä, joilla on aktiivinen verkkosivu ja hyvät arvostelut.');
  
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState<ScrapedLead[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target || !location) {
      setError('Syötä kohde ja sijainti ennen hakuun ryhtymistä.');
      return;
    }

    setIsSearching(true);
    setError(null);
    setLeads([]);

    try {
      // Lähetetään data n8n-webhookille. 
      // Varmistetaan että Hakumäärä on aina numero (vähintään 1) ettei n8n body hajoa
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Kohde: target,
          Sijainti: location,
          Hakumäärä: Math.max(1, parseInt(limit) || 10),
          "Pätevyys ehdot": criteria,
          source: 'Octobound Dashboard'
        }),
      });

      if (!response.ok) throw new Error(`n8n palvelinvirhe: ${response.status}`);

      const responseText = await response.text();
      let data;
      
      try {
        data = responseText ? JSON.parse(responseText) : [];
      } catch (e) {
        console.error("JSON-jäsennysvirhe:", e);
        throw new Error("n8n palautti virheellistä dataa. Varmista 'Respond to Webhook' -noden asetukset.");
      }
      
      const responseArray = Array.isArray(data) ? data : (data.leads || []);
      
      if (responseArray.length === 0) {
        setError('Haku valmistui, mutta tuloksia ei löytynyt. Varmista että n8n-työnkulku palauttaa dataa.');
      }

      const mappedLeads = responseArray.map((item: any, idx: number) => ({
        id: item.id || `lead-${idx}-${Date.now()}`,
        name: item.name || (item.business && item.business.name) || 'Tuntematon yritys',
        company: (item.business && item.business.name) || 'Yritys',
        role: (item.business && item.business.category) || 'Kategoria puuttuu',
        score: item.summary ? item.summary.score : (item.score || 0),
        status: item.summary ? (item.summary.qualified ? 'qualified' : 'rejected') : 'new',
        reason: item.summary ? item.summary.reason : 'Ei AI-analyysia saatavilla',
        website: (item.business && item.business.website) || null
      }));

      setLeads(mappedLeads);
    } catch (err: any) {
      setError(`Yhteysvirhe: ${err.message}. Tarkista n8n 'Respond to Webhook' -node.`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="glass rounded-2xl p-4 flex items-center justify-between px-8 border border-green-500/20 bg-green-500/5">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-[#A0A0A8]">n8n Cloud Engine: <span className="text-white font-mono opacity-80 ml-1">Käyttövalmis</span></span>
         </div>
         <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-wider">
           <CheckCircle2 size={14} /> Connection Stable
         </div>
      </div>

      <div className="glass p-8 rounded-3xl border border-[#8B5CF6]/20 relative overflow-hidden">
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center gap-2 text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={16} /> Google Maps AI Automation
          </div>
          <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Etsi uusia asiakkaita</h2>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-[10px] uppercase font-bold text-[#A0A0A8] mb-2 ml-1">Hakuavain (Kohde)</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A8]" size={18} />
                  <input 
                    type="text" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Esim. Autopesulat"
                    className="w-full bg-[#1A1A1D] border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#8B5CF6]/40 text-white transition-all shadow-inner"
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="block text-[10px] uppercase font-bold text-[#A0A0A8] mb-2 ml-1">Sijainti (Sijainti)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A8]" size={18} />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Esim. Turku"
                    className="w-full bg-[#1A1A1D] border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#8B5CF6]/40 text-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-[10px] uppercase font-bold text-[#A0A0A8] mb-2 ml-1">Määrä (Hakumäärä)</label>
                <div className="relative">
                  <ListOrdered className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A8]" size={18} />
                  <input 
                    type="number" 
                    max="100"
                    min="1"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full bg-[#1A1A1D] border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#8B5CF6]/40 text-white transition-all shadow-inner"
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="block text-[10px] uppercase font-bold text-[#A0A0A8] mb-2 ml-1">AI-Pisteytyksen ehdot</label>
                <div className="relative">
                  <ClipboardCheck className="absolute left-4 top-3.5 text-[#A0A0A8]" size={18} />
                  <textarea 
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    className="w-full bg-[#1A1A1D] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:border-[#8B5CF6]/40 text-white h-[50px] resize-none transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                disabled={isSearching}
                className="w-full bg-[#8B5CF6] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="group-hover:animate-pulse" />}
                {isSearching ? 'Odotetaan vastausta n8n:stä...' : 'Käynnistä AI-haku'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Huomio:</p>
                <p className="opacity-80">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {(isSearching || leads.length > 0) && (
        <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
          <div className="p-6 border-b border-[#1A1A1D] flex items-center justify-between bg-[#1A1A1D]/20">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-bold text-white tracking-tight">Tulokset</h3>
              {isSearching && (
                <div className="flex items-center gap-2 bg-[#8B5CF6]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/20">
                  <Loader2 size={12} className="animate-spin text-[#8B5CF6]" />
                  <span className="text-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider">Työstetään n8n-datavirtaa...</span>
                </div>
              )}
            </div>
            <div className="text-[10px] uppercase font-bold text-[#A0A0A8] bg-[#1A1A1D] px-4 py-1.5 rounded-full border border-white/5">
              Liidejä: {leads.length}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#A0A0A8] text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1D] bg-[#0A0A0B]/50">
                  <th className="px-6 py-4">Yritys</th>
                  <th className="px-6 py-4">Kategoria</th>
                  <th className="px-6 py-4">AI Score</th>
                  <th className="px-6 py-4">Analyysi</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Toiminnot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1D]">
                {isSearching && leads.length === 0 && [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-white/5 rounded-lg"></div>
                        <div className="h-4 bg-white/5 rounded w-full"></div>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#8B5CF6]/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-bold text-sm uppercase group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
                          {lead.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white text-sm group-hover:text-[#A78BFA] transition-colors">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#A0A0A8]">{lead.role}</td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-mono font-bold ${lead.score >= 80 ? 'text-[#8B5CF6]' : lead.score >= 50 ? 'text-blue-400' : 'text-[#A0A0A8]'}`}>
                        {lead.score}%
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-[10px] text-[#A0A0A8] leading-relaxed line-clamp-2 italic">
                        {lead.reason}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${
                        lead.status === 'qualified' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {lead.status === 'qualified' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {lead.status === 'qualified' ? 'Pätevä' : 'Hylätty'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {lead.website ? (
                          <a 
                            href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2.5 bg-[#1A1A1D] text-[#A0A0A8] hover:text-white rounded-xl transition-all border border-white/5 hover:border-[#8B5CF6]/50 shadow-lg"
                          >
                            <Globe size={16} />
                          </a>
                        ) : null}
                        <button className="p-2.5 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white rounded-xl transition-all border border-[#8B5CF6]/20 shadow-lg">
                          <UserPlus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
