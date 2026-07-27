import { Link } from 'react-router-dom';
import { useGame } from '@/hooks/useGame';
import { subjects } from '@/data/content';

export default function Dashboard() {
  const { state, levelProgress, xpToNext } = useGame();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8">
      {/* Welcome + stats */}
      <section className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass rounded-3xl p-7 relative overflow-hidden fade-up">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="flex items-center gap-4 relative">
            <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 grid place-items-center text-2xl font-bold">
              {state.avatar}
            </span>
            <div>
              <p className="opacity-70 text-sm">{greeting},</p>
              <h1 className="font-display text-3xl font-bold">{state.name}!</h1>
            </div>
          </div>

          <div className="mt-7 relative">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold">Level {state.level}</span>
              <span className="opacity-70">{xpToNext} XP to Level {state.level + 1}</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div className="progress-fill h-full rounded-full" style={{ width: `${levelProgress}%` }} />
            </div>
            <p className="text-xs opacity-60 mt-2">{state.xp} total XP earned</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat icon="fa-bolt" label="Total XP" value={state.xp} color="from-amber-400 to-orange-600" />
          <Stat icon="fa-fire" label="Day Streak" value={state.streak} color="from-rose-400 to-pink-600" />
          <Stat icon="fa-trophy" label="Level" value={state.level} color="from-yellow-400 to-amber-600" />
          <Stat icon="fa-medal" label="Badges" value={state.earnedBadges.length} color="from-violet-400 to-purple-600" />
        </div>
      </section>

      {/* Daily challenge banner */}
      <section className="glass rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 fade-up">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 grid place-items-center text-xl">
            <i className="fa-solid fa-fire text-white" />
          </span>
          <div>
            <h3 className="font-semibold text-lg">Daily Challenge</h3>
            <p className="text-sm opacity-70">Complete any quiz today to keep your {state.streak}-day streak alive and earn bonus XP.</p>
          </div>
        </div>
        <Link to="/quiz/java" className="btn-glow inline-flex items-center gap-2 whitespace-nowrap">
          <i className="fa-solid fa-play" /> Take challenge
        </Link>
      </section>

      {/* Subject cards */}
      <section className="fade-up">
        <h2 className="font-display text-2xl font-bold mb-5">Choose your subject</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((s, i) => (
            <Link
              key={s.id}
              to={`/quiz/${s.id}`}
              className="glass glass-hover p-5 group fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center text-2xl group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${s.icon} text-white`} />
                </span>
                <span className="text-xs glass rounded-full px-3 py-1 opacity-80">{s.questions.length} Qs</span>
              </div>
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-sm opacity-70 mt-1 mb-4">{s.description}</p>
              <span className="text-cyan-300 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Start quiz <i className="fa-solid fa-arrow-right" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="fade-up">
        <h2 className="font-display text-2xl font-bold mb-5">Recent activity</h2>
        {state.history.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center">
            <i className="fa-solid fa-clock-rotate-left text-3xl opacity-40 mb-3" />
            <p className="opacity-70">No quizzes yet. Pick a subject above to start your journey!</p>
          </div>
        ) : (
          <div className="glass rounded-3xl divide-y divide-white/5 overflow-hidden">
            {state.history.slice(0, 6).map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl glass grid place-items-center">
                    <i className="fa-solid fa-check-circle text-cyan-300" />
                  </span>
                  <div>
                    <p className="font-medium">{h.subjectName}</p>
                    <p className="text-xs opacity-60">{new Date(h.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-cyan-300">+{h.xp} XP</p>
                  <p className="text-xs opacity-60">{h.accuracy}% accuracy</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  return (
    <div className="glass glass-hover p-4 flex flex-col items-center text-center">
      <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} grid place-items-center text-lg mb-2`}>
        <i className={`fa-solid ${icon} text-white`} />
      </span>
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-60 uppercase tracking-wider">{label}</p>
    </div>
  );
}
