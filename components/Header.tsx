
import React from 'react';
import { Search, Bell, User, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-20 border-b border-[#1A1A1D] flex items-center justify-between px-8 bg-[#0A0A0B]/80 backdrop-blur-md sticky top-0 z-40 ml-[280px]">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#A0A0A8]">Yleisnäkymä</span>
        <ChevronRight size={14} className="text-[#A0A0A8]" />
        <span className="text-white font-medium">Ohjauspaneeli</span>
      </div>

      <div className="hidden lg:flex items-center gap-12 text-sm border-x border-[#1A1A1D] px-12 h-full">
        <div className="flex flex-col">
          <span className="text-[#A0A0A8] text-[10px] uppercase font-bold tracking-wider">Aktiiviset kampanjat</span>
          <span className="text-white font-mono">0</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#A0A0A8] text-[10px] uppercase font-bold tracking-wider">Vastausprosentti</span>
          <span className="text-white font-mono">0.0%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#A0A0A8] text-[10px] uppercase font-bold tracking-wider">Luodut liidit</span>
          <span className="text-white font-mono">0</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A8] group-focus-within:text-[#8B5CF6] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Etsi..." 
            className="bg-[#1A1A1D] border border-transparent focus:border-[#8B5CF6]/30 text-sm pl-10 pr-4 py-2 rounded-lg w-64 transition-all focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]/30 text-white"
          />
        </div>
        <button className="relative p-2 text-[#A0A0A8] hover:text-white hover:bg-white/5 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B5CF6] rounded-full border-2 border-[#0A0A0B] opacity-0"></span>
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-[#8B5CF6]/20 p-0.5 cursor-pointer hover:border-[#8B5CF6]/60 transition-all">
          <img 
            src="https://picsum.photos/seed/octobound/100/100" 
            alt="Profiili" 
            className="w-full h-full rounded-full object-cover grayscale"
          />
        </div>
      </div>
    </header>
  );
};
