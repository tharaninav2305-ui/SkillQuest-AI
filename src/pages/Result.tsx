import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { subjects } from '@/data/content';

interface ResultState {
  subject: string;
  score: number;
  total: number;
  xp: number;
  accuracy: number;
  answers: { q: string; correct: number; chosen: number | null; explanation?: string }[];
}

export default function Result() {
  const loc = useLocation();
  const navigate = useNavigate();
  const data = loc.state as ResultState | null;

  const [ring, setRing] = useState(0);

  const pct = data ? Math.round((data.score / data.total) * 100) : 0;

  // Single effect: redirect if no data, otherwise animate the score ring.
  useEffect(() => {
    if (!data) {
      navigate('/dashboard');
      return;
    }
    const t = setTimeout(() => setRing(pct), 100);
    return () => clearTimeout(t);
  }, [data, navigate, pct]);

  if (!data) return null;

  const { subject, score, total, xp, accuracy, answers } = data;
  const circumference = 2 * Math.PI * 80;
  const incorrect = total - score;

  const subj = subjects.find((s) => s.name === subject);
  const nextSubjects = subjects.filter((s) => s.name !== subject).slice(0, 4);

  const verdict =
    accuracy >= 80 ? { t: 'Outstanding!', i: 'fa-trophy', c: 'text-amber-400' } :
    accuracy >= 50 ? { t: 'Well done!', i: 'fa-star', c: 'text-cyan-300' } :
    { t: 'Keep practicing', i: 'fa-seedling', c: 'text-emerald-300' };

  return (
    <div className="max-w-4xl mx-auto space-y-7">
      {/* Score hero */}
      <div className="glass rounded-3xl p-8 text-center relative overflow-hidden fade-up">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="relative">
          <i className={`fa-solid ${verdict.i} ${verdict.c} text-4xl mb-2`} />
          <h1 className="font-display text-3xl font-bold">{verdict.t}</h1>
          <p className="opacity-70 mt-1">{subject} quiz complete</p>

          {/* Circular chart */}
          <div className="relative w-48 h-48 mx-auto my-6">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle
                cx="90" cy="90" r="80" fill="none"
                stroke="url(#grad)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - ring / 100)}
                style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)' }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div>
                <p className="font-display text-5xl font-extrabold text-gradient">{pct}%</p>
                <p className="text-xs opacity-60 uppercase tracking-wider">Score</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <MiniStat icon="fa-bolt" label="XP earned" value={`+${xp}`} color="from-amber-400 to-orange-600" />
            <MiniStat icon="fa-circle-check" label="Correct" value={String(score)} color="from-emerald-400 to-teal-600" />
            <MiniStat icon="fa-circle-xmark" label="Wrong" value={String(incorrect)} color="from-rose-400 to-pink-600" />
          </div>
        </div>
      </div>

      {/* Accuracy bar */}
      <div className="glass rounded-3xl p-6 fade-up">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">Accuracy</span>
          <span className="opacity-70">{accuracy}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div className="progress-fill h-full rounded-full" style={{ width: `${accuracy}%` }} />
        </div>
      </div>

      {/* Answer review */}
      <div className="glass rounded-3xl p-6 fade-up">
        <h2 className="font-display text-xl font-bold mb-4">Answer review</h2>
        <div className="space-y-3">
          {answers.map((a, i) => {
            const ok = a.chosen === a.correct;
            return (
              <div key={i} className="glass rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${ok ? 'bg-emerald-400/20 text-emerald-300' : 'bg-rose-400/20 text-rose-300'}`}>
                    <i className={`fa-solid ${ok ? 'fa-check' : 'fa-xmark'}`} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{a.q}</p>
                    <p className="text-xs opacity-70">
                      <span className="text-emerald-300">Correct: {String.fromCharCode(65 + a.correct)}</span>
                      {a.chosen !== null && a.chosen !== a.correct && (
                        <span className="ml-3 text-rose-300">Your answer: {String.fromCharCode(65 + a.chosen)}</span>
                      )}
                      {a.chosen === null && <span className="ml-3 text-rose-300">No answer</span>}
                    </p>
                    {a.explanation && (
                      <p className="text-xs opacity-80 mt-2 pl-3 border-l-2 border-cyan-400/60">
                        <i className="fa-solid fa-lightbulb mr-1 text-cyan-300" /> {a.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center fade-up">
        <Link to={`/quiz/${subj?.id ?? 'java'}`} className="btn-glow inline-flex items-center gap-2">
          <i className="fa-solid fa-rotate-right" /> Restart
        </Link>
        <Link to="/dashboard" className="btn-ghost inline-flex items-center gap-2">
          <i className="fa-solid fa-house" /> Dashboard
        </Link>
        <Link to="/leaderboard" className="btn-ghost inline-flex items-center gap-2">
          <i className="fa-solid fa-ranking-star" /> Leaderboard
        </Link>
      </div>

      {/* Suggested next */}
      <div className="fade-up">
        <h3 className="font-display text-lg font-bold mb-3">Try another subject</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {nextSubjects.map((s) => (
            <Link key={s.id} to={`/quiz/${s.id}`} className="glass glass-hover p-4 text-center group">
              <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${s.icon} text-white`} />
              </span>
              <p className="text-sm font-medium">{s.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} grid place-items-center text-sm mx-auto mb-1`}>
        <i className={`fa-solid ${icon} text-white`} />
      </span>
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[10px] opacity-60 uppercase tracking-wider">{label}</p>
    </div>
  );
}
