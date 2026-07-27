import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGame } from '@/hooks/useGame';

export default function Auth({ mode }: { mode: 'login' | 'signup' }) {
  const isSignup = mode === 'signup';
  const { state, setProfile } = useGame();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Already logged in? Skip auth and go straight to the dashboard.
  // (Placed after all hooks so hook order stays stable across renders.)
  if (state.isLoggedIn) return <Navigate to="/dashboard" replace />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulated auth — UI only. setProfile flips isLoggedIn and persists to localStorage.
    setTimeout(() => {
      setProfile(isSignup ? name : (email.split('@')[0] || 'Explorer'), email);
      navigate('/dashboard');
    }, 700);
  }

  return (
    <div className="min-h-[calc(100vh-7rem)] grid place-items-center py-10">
      <div className="w-full max-w-md fade-up">
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-7">
            <span className="inline-grid w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 place-items-center text-2xl mb-4">
              <i className="fa-solid fa-rocket text-white" />
            </span>
            <h1 className="font-display text-2xl font-bold">
              {isSignup ? 'Begin your adventure' : 'Welcome back, hero'}
            </h1>
            <p className="text-sm opacity-70 mt-1">
              {isSignup ? 'Create your free SkillQuest AI account.' : 'Sign in to continue your quest.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <Field
                icon="fa-user"
                placeholder="Full name"
                value={name}
                onChange={setName}
                type="text"
                required
              />
            )}
            <Field
              icon="fa-envelope"
              placeholder="Email address"
              value={email}
              onChange={setEmail}
              type="email"
              required
            />
            <div className="relative">
              <Field
                icon="fa-lock"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                type={show ? 'text' : 'password'}
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                aria-label="Toggle password"
              >
                <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <a href="#" className="text-xs opacity-70 hover:text-cyan-300">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <><i className="fa-solid fa-circle-notch fa-spin" /> Please wait...</>
              ) : (
                <>{isSignup ? 'Create account' : 'Sign in'} <i className="fa-solid fa-arrow-right" /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs opacity-60">or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { i: 'fa-google', c: 'hover:text-rose-400' },
              { i: 'fa-github', c: 'hover:text-white' },
              { i: 'fa-linkedin-in', c: 'hover:text-cyan-400' },
            ].map((s) => (
              <button
                key={s.i}
                type="button"
                className={`glass rounded-xl py-3 grid place-items-center text-lg transition-colors ${s.c}`}
                aria-label={s.i}
              >
                <i className={`fa-brands ${s.i}`} />
              </button>
            ))}
          </div>

          <p className="text-center text-sm mt-6 opacity-75">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Link
              to={isSignup ? '/login' : '/signup'}
              className="text-cyan-300 font-semibold hover:underline"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon, placeholder, value, onChange, type, required,
}: {
  icon: string; placeholder: string; value: string;
  onChange: (v: string) => void; type: string; required?: boolean;
}) {
  return (
    <div className="relative">
      <i className={`fa-solid ${icon} absolute left-4 top-1/2 -translate-y-1/2 opacity-50`} />
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-cyan-400/60 transition-colors placeholder:opacity-50"
      />
    </div>
  );
}
