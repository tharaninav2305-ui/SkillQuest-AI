import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGame } from '@/hooks/useGame';
import Navbar from './Navbar';
import Particles from './Particles';
import CursorGlow from './CursorGlow';

export default function Layout({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const { newBadges, consumeNewBadges } = useGame();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Ambient blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="blob w-[40rem] h-[40rem] bg-blue-600 -top-40 -left-40" />
        <div className="blob w-[35rem] h-[35rem] bg-purple-600 top-1/3 -right-40" style={{ animationDelay: '3s' }} />
        <div className="blob w-[30rem] h-[30rem] bg-cyan-500 bottom-0 left-1/4" style={{ animationDelay: '6s' }} />
      </div>

      <Particles count={18} />
      <CursorGlow />
      <Navbar />

      <main key={loc.pathname} className="page-enter relative z-10 pt-24 pb-10 px-3 sm:px-6 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Badge unlock toast */}
      {newBadges.length > 0 && (
        <div className="fixed bottom-6 right-6 z-[70] space-y-3">
          {newBadges.map((b) => (
            <div key={b.id} className="glass rounded-2xl p-4 pr-8 flex items-center gap-3 fade-up max-w-xs">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-purple-600 grid place-items-center text-xl">
                <i className={`fa-solid ${b.icon}`} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider opacity-70">Badge Unlocked</p>
                <p className="font-semibold">{b.name}</p>
                <p className="text-xs opacity-70">{b.description}</p>
              </div>
            </div>
          ))}
          <button
            onClick={consumeNewBadges}
            className="ml-auto block text-xs opacity-60 hover:opacity-100"
          >
            dismiss
          </button>
        </div>
      )}
    </div>
  );
}
