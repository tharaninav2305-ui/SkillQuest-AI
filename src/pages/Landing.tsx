import { Link } from 'react-router-dom';
import { subjects, testimonials } from '@/data/content';
import { useReveal, useCounter } from '@/hooks/useReveal';
import { useGame } from '@/hooks/useGame';
import Footer from '@/components/Footer';
import { useState } from 'react';

const features = [
  { icon: 'fa-brain', title: 'AI-Powered Quizzes', desc: 'Adaptive questions that target your weak spots and grow with you.', color: 'from-cyan-400 to-blue-600' },
  { icon: 'fa-bolt', title: 'XP & Leveling', desc: 'Earn XP for every correct answer and climb from rookie to legend.', color: 'from-amber-400 to-orange-600' },
  { icon: 'fa-fire', title: 'Daily Streaks', desc: 'Keep your streak alive with a daily challenge and bonus rewards.', color: 'from-rose-400 to-pink-600' },
  { icon: 'fa-trophy', title: 'Live Leaderboard', desc: 'Compete weekly with students across the country for the top spot.', color: 'from-yellow-400 to-amber-600' },
  { icon: 'fa-medal', title: 'Achievement Badges', desc: 'Unlock 8+ unique badges as you master each subject and milestone.', color: 'from-violet-400 to-purple-600' },
  { icon: 'fa-chart-line', title: 'Smart Analytics', desc: 'Track accuracy, XP trends and subject mastery on your profile.', color: 'from-emerald-400 to-teal-600' },
];

const faqs = [
  { q: 'Is SkillQuest AI free to use?', a: 'Yes! The core platform — all 8 subjects, quizzes, XP, streaks and the leaderboard — is completely free for college students preparing for placements.' },
  { q: 'Which subjects are covered?', a: 'Java, SQL, HTML, CSS, JavaScript, DBMS, Networking and Aptitude. Each subject has a bank of curated questions with detailed answer reviews.' },
  { q: 'How does the XP and leveling system work?', a: 'You earn XP for every correct answer, plus a time bonus for quick responses. Every 500 XP levels you up, unlocking new badges and bragging rights on the leaderboard.' },
  { q: 'Do I need to create an account?', a: 'You can explore the landing page freely, but to track XP, streaks, badges and your leaderboard rank, sign up with your email — it takes under a minute.' },
  { q: 'Is my progress saved?', a: 'Yes. Your XP, level, streak, badges and quiz history are saved on your device, so you can pick up your quest right where you left off, any time.' },
  { q: 'Can I compete with my friends?', a: 'Absolutely. The weekly leaderboard ranks everyone on the platform. Climb the ranks, earn badges, and challenge your friends to beat your streak.' },
];

export default function Landing() {
  return (
    <div className="space-y-28">
      <Hero />
      <Stats />
      <SubjectsStrip />
      <Features />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { state } = useGame();
  return (
    <section className="grid lg:grid-cols-2 gap-12 items-center pt-6 min-h-[80vh]">
      <div className="fade-up">
        <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest opacity-80">
          <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-ring" /> AI-Powered Placement Prep
        </span>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mt-5">
          Learn. Play.<br />
          <span className="text-gradient-strong">Level Up.</span>
        </h1>
        <p className="mt-5 text-lg opacity-80 max-w-xl">
          Master Java, SQL, HTML, CSS, JavaScript, DBMS, Networking, and Aptitude
          through AI-powered quizzes. Turn placement prep into an adventure.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to={state.isLoggedIn ? '/dashboard' : '/signup'} className="btn-glow inline-flex items-center gap-2">
            <i className="fa-solid fa-rocket" /> {state.isLoggedIn ? 'Continue Adventure' : 'Start Adventure'}
          </Link>
          <Link to="/login" className="btn-ghost inline-flex items-center gap-2">
            <i className="fa-solid fa-arrow-right-to-bracket" /> I have an account
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {['AM', 'SK', 'DR', 'MI'].map((a, i) => (
              <span key={a} className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 grid place-items-center text-xs font-bold border-2 border-[#07122A]" style={{ zIndex: 10 - i }}>
                {a}
              </span>
            ))}
          </div>
          <p className="text-sm opacity-70">
            <span className="text-amber-400"><i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /></span>
            <br />Loved by 10,000+ students
          </p>
        </div>
      </div>

      <HeroIllustration />
    </section>
  );
}

function HeroIllustration() {
  // Floating 3D subject cards arranged around a central core
  const cards = [
    { s: subjects[0], pos: 'top-2 left-6', delay: '0s', slow: false },
    { s: subjects[1], pos: 'top-10 right-4', delay: '0.5s', slow: true },
    { s: subjects[3], pos: 'bottom-16 left-0', delay: '1s', slow: false },
    { s: subjects[4], pos: 'bottom-6 right-10', delay: '1.5s', slow: true },
    { s: subjects[6], pos: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', delay: '0.3s', slow: false },
  ];

  return (
    <div className="relative fade-up" style={{ animationDelay: '.15s' }}>
      <div className="relative aspect-square max-w-lg mx-auto">
        {/* Rotating ring */}
        <div className="absolute inset-8 rounded-full border border-cyan-400/20" style={{ animation: 'spin 24s linear infinite' }}>
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8]" />
        </div>
        <div className="absolute inset-16 rounded-full border border-purple-400/20" style={{ animation: 'spin 18s linear infinite reverse' }}>
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#7C3AED]" />
        </div>

        {/* Central core */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative w-36 h-36 rounded-full glass gradient-border grid place-items-center text-center pulse-ring">
            <div>
              <i className="fa-solid fa-rocket text-4xl text-gradient-strong" />
              <p className="text-xs mt-2 font-semibold tracking-wider opacity-80">SKILLQUEST AI</p>
            </div>
          </div>
        </div>

        {/* Floating subject cards */}
        {cards.map(({ s, pos, delay, slow }) => (
          <div
            key={s.id}
            className={`absolute ${pos} glass rounded-2xl p-3 flex items-center gap-2 ${slow ? 'float-card-slow' : 'float-card'}`}
            style={{ animationDelay: delay }}
          >
            <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center text-lg`}>
              <i className={`fa-solid ${s.icon} text-white`} />
            </span>
            <span className="text-sm font-medium pr-1">{s.name}</span>
          </div>
        ))}

        {/* XP chip */}
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 glass rounded-full px-3 py-1.5 text-xs font-bold text-cyan-300 float-card" style={{ animationDelay: '0.8s' }}>
          <i className="fa-solid fa-bolt" /> +50 XP
        </div>
      </div>
    </div>
  );
}

/* ---------------- ANIMATED STATS ---------------- */
function Stats() {
  const stats = [
    { value: 8, suffix: '', label: 'Subjects' },
    { value: 64, suffix: '+', label: 'Questions' },
    { value: 10000, suffix: '+', label: 'Students' },
    { value: 500, suffix: '', label: 'XP per level' },
  ];
  return (
    <section className="reveal" ref={useReveal().ref}>
      <div className="glass rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: v } = useCounter(value);
  return (
    <div className="text-center">
      <p className="font-display text-4xl sm:text-5xl font-extrabold text-gradient-strong">
        {v.toLocaleString()}{suffix}
      </p>
      <p className="text-xs opacity-60 uppercase tracking-wider mt-1">{label}</p>
      <span ref={ref} className="sr-only">{label}</span>
    </div>
  );
}

/* ---------------- SUBJECTS MARQUEE ---------------- */
function SubjectsStrip() {
  const loop = [...subjects, ...subjects];
  return (
    <section className="reveal" ref={useReveal().ref}>
      <h2 className="font-display text-3xl font-bold text-center mb-2">8 Subjects. One Quest.</h2>
      <p className="text-center opacity-70 mb-8">Pick a path and start earning XP today.</p>
      <div className="marquee-wrap overflow-hidden glass rounded-3xl py-5">
        <div className="marquee">
          {loop.map((s, i) => (
            <Link
              to="/dashboard"
              key={`${s.id}-${i}`}
              className="shrink-0 glass glass-hover px-5 py-3 flex items-center gap-3 rounded-2xl"
            >
              <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center`}>
                <i className={`fa-solid ${s.icon} text-white`} />
              </span>
              <span className="font-medium whitespace-nowrap">{s.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES (3D cards) ---------------- */
function Features() {
  const { ref } = useReveal();
  return (
    <section className="reveal" ref={ref}>
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-cyan-300">Why SkillQuest</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Built for future placement heroes</h2>
        <p className="opacity-70 mt-2">Everything you need to turn prep into play.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[number]; index: number }) {
  const { ref, inView } = useReveal();
  return (
    <div
      ref={ref}
      className={`card-3d glass glass-hover p-6 reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="card-inner">
        <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} grid place-items-center text-2xl mb-4 shadow-lg`}>
          <i className={`fa-solid ${feature.icon} text-white`} />
        </span>
        <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
        <p className="text-sm opacity-70">{feature.desc}</p>
        <div className="mt-4 h-px bg-gradient-to-r from-cyan-400/40 via-purple-400/30 to-transparent" />
      </div>
    </div>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const { ref } = useReveal();
  return (
    <section className="reveal" ref={ref}>
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-cyan-300">Testimonials</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Loved by Students</h2>
        <p className="opacity-70 mt-2">Real stories from real placement heroes.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[number]; index: number }) {
  const { ref, inView } = useReveal();
  return (
    <div
      ref={ref}
      className={`glass glass-hover p-6 flex gap-4 reveal-${index % 2 === 0 ? 'left' : 'right'} ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 grid place-items-center font-bold">
        {t.avatar}
      </span>
      <div>
        <div className="flex gap-1 text-amber-400 mb-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className={`fa-solid fa-star ${i < t.rating ? '' : 'opacity-25'}`} />
          ))}
        </div>
        <p className="text-sm opacity-85 italic">"{t.text}"</p>
        <p className="mt-2 font-semibold text-sm">{t.name}</p>
        <p className="text-xs opacity-60">{t.role}</p>
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const { ref } = useReveal();
  return (
    <section className="reveal max-w-3xl mx-auto" ref={ref}>
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-cyan-300">FAQ</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Questions, answered</h2>
        <p className="opacity-70 mt-2">Everything you might want to know before you start.</p>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="faq-item glass rounded-2xl px-5 py-4 group">
            <summary className="flex items-center justify-between gap-4 font-medium">
              <span>{f.q}</span>
              <span className="faq-icon w-7 h-7 rounded-lg glass grid place-items-center shrink-0 text-cyan-300">
                <i className="fa-solid fa-plus text-sm" />
              </span>
            </summary>
            <p className="mt-3 text-sm opacity-75 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const { ref, inView } = useReveal();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <section className="reveal" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Info side */}
        <div className={`glass rounded-3xl p-8 reveal-left ${inView ? 'in-view' : ''}`}>
          <span className="text-xs uppercase tracking-widest text-cyan-300">Contact</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Let's level up together</h2>
          <p className="opacity-75 mt-3">
            Have a question, partnership idea, or feedback? Drop us a message and
            our team will get back to you within 24 hours.
          </p>

          <div className="mt-7 space-y-4">
            <ContactRow icon="fa-envelope" label="Email" value="hello@skillquest.ai" />
            <ContactRow icon="fa-location-dot" label="Location" value="Remote · Worldwide" />
            <ContactRow icon="fa-clock" label="Response time" value="Within 24 hours" />
          </div>

          <div className="mt-7 flex gap-3">
            {[
              { i: 'fa-github', href: 'https://github.com' },
              { i: 'fa-linkedin-in', href: 'https://linkedin.com' },
              { i: 'fa-envelope', href: 'mailto:hello@skillquest.ai' },
            ].map((s) => (
              <a key={s.i} href={s.href} target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center glass rounded-xl text-lg hover:text-cyan-300 hover:-translate-y-1 transition-all">
                <i className={`fa-brands ${s.i} ${s.i === 'fa-envelope' ? 'fa-solid' : ''}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Form side */}
        <div className={`glass rounded-3xl p-8 reveal-right ${inView ? 'in-view' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input icon="fa-user" placeholder="Your name" type="text" required />
              <Input icon="fa-envelope" placeholder="Email address" type="email" required />
            </div>
            <Input icon="fa-tag" placeholder="Subject" type="text" required />
            <div className="relative">
              <i className="fa-solid fa-message absolute left-4 top-4 opacity-50" />
              <textarea
                required
                rows={5}
                placeholder="Your message"
                className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-cyan-400/60 transition-colors placeholder:opacity-50 resize-none"
              />
            </div>
            <button type="submit" className="btn-glow w-full flex items-center justify-center gap-2">
              {sent ? (
                <><i className="fa-solid fa-check" /> Message sent!</>
              ) : (
                <>Send message <i className="fa-solid fa-paper-plane" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-11 h-11 rounded-xl glass grid place-items-center text-cyan-300">
        <i className={`fa-solid ${icon}`} />
      </span>
      <div>
        <p className="text-xs opacity-60 uppercase tracking-wider">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function Input({ icon, placeholder, type, required }: { icon: string; placeholder: string; type: string; required?: boolean }) {
  return (
    <div className="relative">
      <i className={`fa-solid ${icon} absolute left-4 top-1/2 -translate-y-1/2 opacity-50`} />
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-cyan-400/60 transition-colors placeholder:opacity-50"
      />
    </div>
  );
}
