
import React from 'react';
import { MOCK_CAMPAIGNS } from '../constants';
import { ChevronRight, Inbox } from 'lucide-react';

export const CampaignTable: React.FC = () => {
  const statusLabels: Record<string, string> = {
    active: 'aktiivinen',
    paused: 'pysäytetty',
    completed: 'valmis'
  };

  return (
    <div className="glass rounded-2xl overflow-hidden mt-8 border border-white/5">
      <div className="p-6 border-b border-[#1A1A1D] flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Liidiputken yleiskatsaus</h2>
        <button className="text-[#A0A0A8] text-sm font-semibold flex items-center gap-1 cursor-default opacity-50">
          Näytä kaikki <ChevronRight size={16} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#1A1A1D]/50">
            <tr className="text-[#A0A0A8] text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1D]">
              <th className="px-6 py-4">Sija</th>
              <th className="px-6 py-4">Kampanjan nimi</th>
              <th className="px-6 py-4">Tila</th>
              <th className="px-6 py-4">Liidit</th>
              <th className="px-6 py-4">Vastaus- %</th>
              <th className="px-6 py-4">Konversio</th>
              <th className="px-6 py-4">Toiminto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1D]">
            {MOCK_CAMPAIGNS.length > 0 ? (
              MOCK_CAMPAIGNS.map((campaign, idx) => (
                <tr key={campaign.id} className="hover:bg-[#8B5CF6]/5 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-[#A0A0A8]">#{idx + 1}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-white group-hover:text-[#A78BFA] transition-colors">{campaign.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      campaign.status === 'active' ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]' : 'bg-[#A0A0A8]/10 text-[#A0A0A8]'
                    }`}>
                      {statusLabels[campaign.status] || campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-white">{campaign.leads.toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono text-white">{campaign.responseRate}%</td>
                  <td className="px-6 py-4 font-mono text-white">{campaign.conversionRate}%</td>
                  <td className="px-6 py-4">
                    <button className="text-xs font-bold text-[#A0A0A8] hover:text-[#8B5CF6] uppercase tracking-tighter">Tiedot</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-30">
                    <Inbox size={40} />
                    <p className="text-sm font-medium">Ei aktiivisia kampanjoita näytettäväksi.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
