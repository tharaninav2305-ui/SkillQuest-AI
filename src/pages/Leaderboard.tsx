import { useState } from 'react';
import { leaderboard } from '@/data/content';
import { useGame } from '@/hooks/useGame';

type Tab = 'weekly' | 'alltime';

export default function Leaderboard() {
  const { state } = useGame();
  const [tab, setTab] = useState<Tab>('weekly');

  // Merge current user into the board
  const merged: Array<{ name: string; xp: number; level: number; badges: number; avatar: string; isYou: boolean }> = [
    ...leaderboard.map((r) => ({ ...r, isYou: false })),
    { name: state.name, xp: state.xp, level: state.level, badges: state.earnedBadges.length, avatar: state.avatar, isYou: true },
  ];
  const rows = merged
    .sort((a, b) => b.xp - a.xp)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  const medal = (rank: number) =>
    rank === 1 ? 'from-amber-300 to-yellow-500' :
    rank === 2 ? 'from-slate-200 to-slate-400' :
    rank === 3 ? 'from-amber-600 to-orange-800' : 'from-white/10 to-white/10';

  return (
    <div className="max-w-4xl mx-auto space-y-7">
      <div className="text-center fade-up">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Leaderboard</h1>
        <p className="opacity-70 mt-1">Climb the ranks and become a placement legend.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 fade-up">
        {(['weekly', 'alltime'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === t ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'glass hover:bg-white/10'
            }`}
          >
            {t === 'weekly' ? 'This Week' : 'All Time'}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5 items-end fade-up">
        {[1, 0, 2].map((pos) => {
          const r = top3[pos];
          if (!r) return <div key={pos} />;
          const heights = ['h-32', 'h-44', 'h-28'];
          const sizes = ['w-16 h-16', 'w-20 h-20', 'w-14 h-14'];
          return (
            <div key={pos} className="flex flex-col items-center">
              <div className={`relative ${sizes[pos]} rounded-full bg-gradient-to-br ${medal(r.rank)} grid place-items-center font-bold text-lg shadow-xl mb-2 ${r.isYou ? 'ring-2 ring-cyan-400' : ''}`}>
                {r.avatar}
                <span className="absolute -bottom-2 w-7 h-7 rounded-full bg-navy-2 grid place-items-center text-xs font-bold border border-white/20" style={{ background: '#0B1B3D' }}>
                  {r.rank}
                </span>
              </div>
              <p className="text-sm font-semibold text-center truncate max-w-full">{r.isYou ? 'You' : r.name}</p>
              <p className="text-xs opacity-60 mb-2">{r.xp.toLocaleString()} XP</p>
              <div className={`w-full ${heights[pos]} glass rounded-t-2xl grid place-items-center`}>
                <i className={`fa-solid ${r.rank === 1 ? 'fa-crown text-amber-300' : r.rank === 2 ? 'fa-medal text-slate-300' : 'fa-award text-amber-600'} text-2xl`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of the list */}
      <div className="glass rounded-3xl overflow-hidden fade-up">
        <div className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-wider opacity-60 border-b border-white/5">
          <span className="col-span-1">Rank</span>
          <span className="col-span-6">Student</span>
          <span className="col-span-2 text-center">Badges</span>
          <span className="col-span-3 text-right">XP</span>
        </div>
        <div className="divide-y divide-white/5">
          {rest.map((r) => (
            <div
              key={r.rank}
              className={`grid grid-cols-12 px-5 py-3 items-center transition-colors ${
                r.isYou ? 'bg-cyan-400/10' : 'hover:bg-white/5'
              }`}
            >
              <span className="col-span-1 font-display font-bold opacity-70">#{r.rank}</span>
              <div className="col-span-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 grid place-items-center text-xs font-bold">
                  {r.avatar}
                </span>
                <span className="font-medium text-sm">{r.isYou ? `${r.name} (You)` : r.name}</span>
              </div>
              <span className="col-span-2 text-center text-sm">
                <i className="fa-solid fa-medal text-amber-400 mr-1" />{r.badges}
              </span>
              <span className="col-span-3 text-right font-display font-bold text-cyan-300">{r.xp.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
