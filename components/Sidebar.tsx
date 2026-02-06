
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-[280px] h-screen bg-[#0A0A0B] border-r border-[#1A1A1D] flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
      <div className="p-8 pb-4">
        <div className="flex flex-col items-center mb-8">
          {/* Tasapainotettu logokoko */}
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
          <p className="text-[10px] text-[#A0A0A8] mt-2">Viimeisin kirjautuminen: 12min sitten</p>
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
                    <a
                      href={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        item.label === 'Ohjauspaneeli' 
                        ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20' 
                        : 'text-[#A0A0A8] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${item.label === 'Ohjauspaneeli' ? 'text-[#8B5CF6]' : 'text-[#A0A0A8] group-hover:text-white'}`}>
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-[#8B5CF6] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-[#1A1A1D]">
        <button className="flex items-center gap-3 text-[#A0A0A8] hover:text-white transition-colors text-sm font-medium w-full">
          <LogOut size={20} />
          Kirjaudu ulos
        </button>
      </div>
    </aside>
  );
};
