import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '@/hooks/useGame';

export default function Navbar() {
  const { state, toggleDarkMode, logout } = useGame();
  const navigate = useNavigate();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/profile', label: 'Profile' },
  ];

  const isActive = (p: string) => loc.pathname === p;

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass mx-3 mt-3 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 grid place-items-center text-lg shadow-lg group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-rocket text-white" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Skill<span className="text-gradient">Quest</span> AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(l.to)
                  ? 'bg-white/10 text-cyan-300'
                  : 'hover:bg-white/5 hover:text-cyan-200'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full glass grid place-items-center hover:text-cyan-300 transition-colors"
          >
            <i className={`fa-solid ${state.darkMode ? 'fa-sun' : 'fa-moon'}`} />
          </button>

          <div className="hidden sm:flex items-center gap-2 glass rounded-full px-2 py-1">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 grid place-items-center text-xs font-bold">
              {state.avatar}
            </span>
            <span className="text-sm font-medium pr-2">{state.level >= 1 ? `Lv ${state.level}` : 'Lv 1'}</span>
          </div>

          {state.isLoggedIn && (
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="w-9 h-9 rounded-full glass grid place-items-center hover:text-rose-300 transition-colors"
            >
              <i className="fa-solid fa-arrow-right-from-bracket" />
            </button>
          )}

          <button
            className="md:hidden w-9 h-9 rounded-full glass grid place-items-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-3 mt-2 glass rounded-2xl p-2 fade-up">
          {links.map((l) => (
            <button
              key={l.to}
              onClick={() => { setOpen(false); navigate(l.to); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(l.to) ? 'bg-white/10 text-cyan-300' : 'hover:bg-white/5'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
