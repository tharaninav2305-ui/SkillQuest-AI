import { Link } from 'react-router-dom';
import { useGame } from '@/hooks/useGame';
import { badges, subjects } from '@/data/content';

export default function Profile() {
  const { state, levelProgress, xpToNext, reset } = useGame();

  const earned = new Set(state.earnedBadges);
  const totalQuizzes = state.history.length;
  const avgAccuracy = totalQuizzes
    ? Math.round(state.history.reduce((a, h) => a + h.accuracy, 0) / totalQuizzes)
    : 0;

  // Subject mastery (best accuracy per subject)
  const mastery = subjects.map((s) => {
    const recs = state.history.filter((h) => h.subject === s.id);
    const best = recs.length ? Math.max(...recs.map((r) => r.accuracy)) : 0;
    return { ...s, best, attempts: recs.length };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-7">
      {/* Profile header */}
      <div className="glass rounded-3xl p-7 relative overflow-hidden fade-up">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <span className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 grid place-items-center text-4xl font-bold shadow-xl">
              {state.avatar}
            </span>
            <span className="absolute -bottom-2 -right-2 glass rounded-full px-2 py-1 text-xs font-bold">
              Lv {state.level}
            </span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-display text-3xl font-bold">{state.name}</h1>
            <p className="opacity-60 text-sm">{state.email || 'No email set'}</p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <Chip icon="fa-bolt" label={`${state.xp} XP`} />
              <Chip icon="fa-fire" label={`${state.streak} day streak`} />
              <Chip icon="fa-trophy" label={`${state.earnedBadges.length} badges`} />
              <Chip icon="fa-clipboard-check" label={`${totalQuizzes} quizzes`} />
            </div>
          </div>
          <button
            onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) reset(); }}
            className="btn-ghost text-sm inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-rotate-left" /> Reset
          </button>
        </div>

        {/* Level progress */}
        <div className="mt-6 relative">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">Level {state.level}</span>
            <span className="opacity-70">{xpToNext} XP to next level</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="progress-fill h-full rounded-full" style={{ width: `${levelProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 fade-up">
        <Stat icon="fa-bolt" label="Total XP" value={state.xp} color="from-amber-400 to-orange-600" />
        <Stat icon="fa-bullseye" label="Avg Accuracy" value={`${avgAccuracy}%`} color="from-cyan-400 to-blue-600" />
        <Stat icon="fa-fire" label="Best Streak" value={state.streak} color="from-rose-400 to-pink-600" />
        <Stat icon="fa-graduation-cap" label="Subjects Tried" value={`${state.subjectsTried.length}/8`} color="from-violet-400 to-purple-600" />
      </div>

      {/* Badges */}
      <section className="fade-up">
        <h2 className="font-display text-2xl font-bold mb-4">Achievement Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((b) => {
            const unlocked = earned.has(b.id);
            return (
              <div
                key={b.id}
                className={`glass p-5 text-center transition-all ${unlocked ? 'glass-hover' : 'opacity-40 grayscale'}`}
              >
                <span className={`w-14 h-14 rounded-2xl grid place-items-center text-2xl mx-auto mb-2 ${
                  unlocked ? 'bg-gradient-to-br from-amber-400 to-purple-600' : 'bg-white/10'
                }`}>
                  <i className={`fa-solid ${b.icon} ${unlocked ? 'text-white' : ''}`} />
                </span>
                <p className="font-semibold text-sm">{b.name}</p>
                <p className="text-xs opacity-60 mt-1">{b.description}</p>
                <span className="text-[10px] uppercase tracking-wider mt-2 inline-block opacity-70">{b.tier}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subject mastery */}
      <section className="fade-up">
        <h2 className="font-display text-2xl font-bold mb-4">Subject Mastery</h2>
        <div className="glass rounded-3xl p-6 space-y-4">
          {mastery.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <i className={`fa-solid ${s.icon} w-5 text-center`} />
                  {s.name}
                </span>
                <span className="opacity-70">{s.best}% {s.attempts > 0 && `(${s.attempts}x)`}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.best}%`, transition: 'width .8s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz history */}
      <section className="fade-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-bold">Quiz History</h2>
          <Link to="/dashboard" className="text-sm text-cyan-300 hover:underline">Take a quiz</Link>
        </div>
        {state.history.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center opacity-70">
            <i className="fa-solid fa-clock-rotate-left text-3xl mb-3 opacity-40" />
            <p>No quizzes yet — your adventure starts now!</p>
          </div>
        ) : (
          <div className="glass rounded-3xl divide-y divide-white/5 overflow-hidden">
            {state.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl glass grid place-items-center">
                    <i className="fa-solid fa-check text-cyan-300" />
                  </span>
                  <div>
                    <p className="font-medium">{h.subjectName}</p>
                    <p className="text-xs opacity-60">{new Date(h.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-cyan-300">+{h.xp} XP</p>
                  <p className="text-xs opacity-60">{h.score}/{h.total} · {h.accuracy}%</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Chip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="glass rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5">
      <i className={`fa-solid ${icon} text-cyan-300`} /> {label}
    </span>
  );
}

function Stat({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  return (
    <div className="glass glass-hover p-4 text-center">
      <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} grid place-items-center text-lg mx-auto mb-2`}>
        <i className={`fa-solid ${icon} text-white`} />
      </span>
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-60 uppercase tracking-wider">{label}</p>
    </div>
  );
}
