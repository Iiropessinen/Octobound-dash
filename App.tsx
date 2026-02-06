
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CampaignCard } from './components/CampaignCard';
import { CampaignTable } from './components/CampaignTable';
import { LeadAutomation } from './components/LeadAutomation';
import { Login } from './components/Login';
import { MOCK_CAMPAIGNS, NAV_ITEMS } from './constants';
// Added missing Zap and ChevronRight imports from lucide-react
import { Plus, Bot, Sparkles, Filter, LogOut, LayoutDashboard, Zap, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavClick = (path: string) => {
    setCurrentView(path);
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">
      <aside className="w-[280px] h-screen bg-[#0A0A0B] border-r border-[#1A1A1D] flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
        <div className="p-8 pb-4">
          <div className="flex flex-col items-center mb-8 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="w-full h-32 flex items-center justify-center overflow-visible">
              <img 
                src="https://i.imgur.com/9z13X6p.png" 
                alt="Octobound Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-[1.6] transition-transform hover:scale-[1.7] duration-500"
              />
            </div>
          </div>

          <div className="bg-[#1A1A1D] rounded-xl p-4 mb-8 border border-white/5">
            <p className="text-xs text-[#A0A0A8] uppercase tracking-wider font-semibold mb-1">Tervetuloa takaisin</p>
            <p className="text-white font-medium">Alex Rivera</p>
            <p className="text-[10px] text-[#A0A0A8] mt-2">Viimeisin kirjautuminen: juuri nyt</p>
          </div>

          <nav className="space-y-8">
            {NAV_ITEMS.map((section) => (
              <div key={section.section}>
                <h3 className="text-[10px] uppercase text-[#A0A0A8] font-bold tracking-widest mb-4 ml-2">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          currentView === item.path 
                          ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20' 
                          : 'text-[#A0A0A8] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${currentView === item.path ? 'text-[#8B5CF6]' : 'text-[#A0A0A8] group-hover:text-white'}`}>
                            {item.icon}
                          </span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        {item.badge > 0 && (
                          <span className="bg-[#8B5CF6] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-[#1A1A1D]">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 text-[#A0A0A8] hover:text-white transition-colors text-sm font-medium w-full">
            <LogOut size={20} />
            Kirjaudu ulos
          </button>
        </div>
      </aside>
      
      <main className="flex-1 ml-[280px]">
        <Header />

        <div className="p-8 max-w-7xl mx-auto">
          {currentView === 'dashboard' ? (
            <>
              <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-bold border border-[#8B5CF6]/20">
                      <Sparkles size={14} /> AI-moottori valmiina
                    </div>
                    <div className="flex items-center gap-2 text-[#A0A0A8] text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Järjestelmä online
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">Ohjauspaneeli <LayoutDashboard className="inline-block text-[#8B5CF6] ml-2" size={32} /></h1>
                  <p className="text-[#A0A0A8]">
                    Aloita uusi liidinhankinta käyttämällä <span className="text-[#8B5CF6] font-medium">AI-Automaatiota</span>.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentView('automation')}
                    className="flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Plus size={18} /> Uusi haku
                  </button>
                </div>
              </section>

              {MOCK_CAMPAIGNS.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {MOCK_CAMPAIGNS.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              ) : (
                <div className="glass rounded-3xl p-12 text-center border-dashed border-[#8B5CF6]/20 mb-12">
                  <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="text-[#8B5CF6]" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ei aktiivisia kampanjoita</h3>
                  <p className="text-[#A0A0A8] max-w-sm mx-auto mb-8">
                    Sinulla ei ole vielä käynnissä olevia kampanjoita. Luo ensimmäinen haku AI-agenttimme avulla.
                  </p>
                  <button 
                    onClick={() => setCurrentView('automation')}
                    className="text-[#8B5CF6] font-bold hover:underline inline-flex items-center gap-2"
                  >
                    Mene AI-Automaatioon <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <section>
                 <CampaignTable />
              </section>
            </>
          ) : currentView === 'automation' ? (
            <LeadAutomation />
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-20 h-20 bg-[#1A1A1D] rounded-3xl flex items-center justify-center mb-6 border border-white/5">
                <Sparkles size={40} className="text-[#8B5CF6]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Näkymä rakenteilla</h2>
              <p className="text-[#A0A0A8] max-w-sm">Tämä osio valmistuu pian. Käytä sillä välin Ohjauspaneelia tai AI-Automaatiota.</p>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="mt-8 text-[#8B5CF6] font-bold hover:underline"
              >
                Palaa Ohjauspaneeliin
              </button>
            </div>
          )}
        </div>
      </main>

      <button 
        onClick={() => setCurrentView('automation')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(139,92,246,0.5)] hover:rotate-90 transition-all duration-300 z-50 group"
      >
        <Plus size={28} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

export default App;
