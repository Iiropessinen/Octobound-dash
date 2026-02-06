
import React from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { CampaignData } from '../types';

interface CampaignCardProps {
  campaign: CampaignData;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const statusLabels: Record<string, string> = {
    active: 'aktiivinen',
    paused: 'pysäytetty',
    completed: 'valmis'
  };

  return (
    <div className="glass rounded-2xl p-6 hover:border-[#8B5CF6]/30 transition-all group purple-glow">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1A1A1D] border border-white/5 flex items-center justify-center group-hover:border-[#8B5CF6]/40 transition-colors">
            <Activity className="text-[#8B5CF6]" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-[#A78BFA] transition-colors">{campaign.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${campaign.status === 'active' ? 'bg-[#8B5CF6] animate-pulse' : 'bg-[#A0A0A8]'}`}></span>
              <span className="text-[10px] uppercase text-[#A0A0A8] font-bold tracking-widest">{statusLabels[campaign.status] || campaign.status}</span>
            </div>
          </div>
        </div>
        <button className="text-[#A0A0A8] hover:text-white p-1">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[#A0A0A8] text-xs mb-1">Liidit yhteensä</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{campaign.leads.toLocaleString()}</span>
            <span className={`text-xs font-medium flex items-center ${campaign.change >= 0 ? 'text-[#8B5CF6]' : 'text-red-400'}`}>
              {campaign.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(campaign.change)}%
            </span>
          </div>
        </div>

        <div className="w-32 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={campaign.history}>
              <defs>
                <linearGradient id={`gradient-${campaign.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill={`url(#gradient-${campaign.id})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
