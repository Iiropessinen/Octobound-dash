
import React, { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock-tunnukset: 123 / 123
    setTimeout(() => {
      if (email === '123' && password === '123') {
        onLogin(true);
      } else {
        setError('Väärä tunnus tai salasana. Kokeile: 123 / 123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] p-6 text-white font-sans overflow-hidden">
      {/* Taustan hehku-efektit */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          {/* Säädetty logokoko kirjautumisessa */}
          <div className="w-full h-40 mb-4 flex items-center justify-center overflow-visible">
            <img 
              src="https://i.imgur.com/9z13X6p.png" 
              alt="Octobound Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(139,92,246,0.6)] scale-[2.0]"
            />
          </div>
          <p className="text-[#A0A0A8] text-center max-w-xs mt-2">Tehokasta liidinhankintaa ja kontaktointia älykkäästi.</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/5 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Kirjaudu sisään</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#A0A0A8] uppercase tracking-wider mb-2">Käyttäjätunnus tai Sähköposti</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A8] group-focus-within:text-[#8B5CF6] transition-colors" size={18} />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="123" 
                  required
                  className="w-full bg-[#1A1A1D] border border-white/5 focus:border-[#8B5CF6]/30 text-sm pl-10 pr-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]/30 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A0A0A8] uppercase tracking-wider mb-2">Salasana</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A8] group-focus-within:text-[#8B5CF6] transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123" 
                  required
                  className="w-full bg-[#1A1A1D] border border-white/5 focus:border-[#8B5CF6]/30 text-sm pl-10 pr-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]/30 text-white"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-[#8B5CF6] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Kirjaudu sisään'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-[#A0A0A8]">
              Eikö sinulla ole tiliä? <a href="#" className="text-[#8B5CF6] hover:underline font-semibold">Aloita ilmainen kokeilu</a>
            </p>
          </div>
        </div>
        
        <p className="mt-10 text-center text-[#A0A0A8] text-xs">
          © 2025 Octobound AI Solutions. Kaikki oikeudet pidätetään.
        </p>
      </div>
    </div>
  );
};
