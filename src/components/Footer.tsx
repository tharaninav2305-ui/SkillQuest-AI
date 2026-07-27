import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24">
      <div className="glass mx-3 sm:mx-6 rounded-3xl px-6 sm:px-10 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 grid place-items-center">
                <i className="fa-solid fa-rocket text-white" />
              </span>
              <span className="font-display font-bold text-lg">
                Skill<span className="text-gradient">Quest</span> AI
              </span>
            </div>
            <p className="text-sm opacity-70 max-w-sm">
              The AI-powered gamified learning platform built for college students
              preparing for placements. Learn. Play. Level Up.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">Platform</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/dashboard" className="hover:text-cyan-300">Dashboard</Link></li>
              <li><Link to="/leaderboard" className="hover:text-cyan-300">Leaderboard</Link></li>
              <li><Link to="/profile" className="hover:text-cyan-300">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">Connect</h4>
            <div className="flex gap-3 text-lg">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-9 h-9 grid place-items-center glass rounded-full hover:text-cyan-300 hover:-translate-y-1 transition-all"><i className="fa-brands fa-github" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 grid place-items-center glass rounded-full hover:text-cyan-300 hover:-translate-y-1 transition-all"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="mailto:hello@skillquest.ai" aria-label="Email" className="w-9 h-9 grid place-items-center glass rounded-full hover:text-cyan-300 hover:-translate-y-1 transition-all"><i className="fa-solid fa-envelope" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs opacity-60">
          <p>© {new Date().getFullYear()} SkillQuest AI. Crafted for future placement heroes.</p>
          <p>Made with <i className="fa-solid fa-heart text-pink-400" /> for learners.</p>
        </div>
      </div>
    </footer>
  );
}
