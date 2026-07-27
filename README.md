# SkillQuest AI

A gamified placement-prep platform that turns studying into an adventure. Take timed quizzes across eight core subjects, earn XP, unlock badges, keep streaks, and climb the leaderboard — all wrapped in a polished, animated glassmorphism UI.
## Live demo
https://skillquest-ai-app.vercel.app
## Features

- **8 subjects, 80 questions** — Java, SQL, HTML, CSS, JavaScript, DBMS, Networking, and Aptitude (10 questions each, four options, with explanations).
- **Timed quiz engine** — 20-second per-question countdown with auto-submit on expiry.
- **XP & leveling** — correct answers award XP (with a time bonus); level up automatically.
- **Answer explanations** — every question shows why the correct answer is right, both on the quiz screen and in the results review.
- **Streaks & badges** — daily streak tracking and unlockable achievement badges (bronze → platinum).
- **Leaderboard** — compete against other learners on XP and level.
- **Profile & dashboard** — track XP, level, quiz history, badges, and streaks.
- **Dark / light mode** — theme toggle persisted across sessions.
- **Local persistence** — progress saved to `localStorage`; no backend required.
- **Responsive & accessible** — mobile, tablet, and desktop layouts with semantic HTML, ARIA labels, and keyboard-friendly controls.
- **Polished UI** — glassmorphism cards, gradient accents, particle background, cursor glow, scroll-reveal animations, and 3D card tilt — all built with Tailwind CSS.

## Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Framework   | React 18 + TypeScript                         |
| Build tool   | Vite 5                                        |
| Styling     | Tailwind CSS 3 + custom CSS                   |
| Routing     | React Router v6                              |
| Icons       | Font Awesome 6                                |
| Fonts       | Sora (body) + Space Grotesk (display)         |
| State       | React Context + `localStorage` persistence   |
| Linting     | ESLint + typescript-eslint + React Hooks plugin |

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/skillquest-ai.git
cd skillquest-ai

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open the app
# Vite prints a local URL (default: http://localhost:5173)
```

### Available Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR       |
| `npm run build`     | Type-check and build for production      |
| `npm run typecheck` | Run the TypeScript compiler (no emit)    |
| `npm run lint`      | Run ESLint across the codebase           |
| `npm run preview`   | Preview the production build locally    |

## Folder Structure

```
skillquest-ai/
├── public/
│   └── favicon.svg            # App favicon
├── src/
│   ├── components/
│   │   ├── CursorGlow.tsx      # Mouse-follow glow (desktop only)
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Layout.tsx          # Shared layout (navbar + particles + outlet)
│   │   ├── Navbar.tsx          # Top navigation with auth state
│   │   └── Particles.tsx       # Floating background particles
│   ├── context/
│   │   └── GameContext.tsx     # Global game state (XP, level, badges, streak)
│   ├── data/
│   │   └── content.ts          # Subjects, questions, badges, leaderboard data
│   ├── hooks/
│   │   ├── useGame.ts          # Consumer hook for GameContext
│   │   └── useReveal.ts        # IntersectionObserver scroll-reveal hook
│   ├── pages/
│   │   ├── Auth.tsx            # Login / signup screen
│   │   ├── Dashboard.tsx       # Subject picker + stats overview
│   │   ├── Landing.tsx         # Marketing landing page
│   │   ├── Leaderboard.tsx     # XP leaderboard
│   │   ├── Profile.tsx         # User profile + achievements
│   │   ├── Quiz.tsx            # Timed quiz engine
│   │   └── Result.tsx          # Score summary + answer review
│   ├── App.tsx                 # Router + provider root
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles, animations, theme tokens
├── index.html                  # HTML shell with SEO + OG meta
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## How It Works

1. **Sign in** on the Auth page (any email/password — stored locally, no backend).
2. **Pick a subject** from the Dashboard to start a quiz.
3. **Answer 10 timed questions** — 20 seconds each. Earn XP for correct answers (plus a time bonus). Wrong or timed-out answers reveal the correct option and an explanation.
4. **See your results** — score, accuracy, XP earned, and a full answer review with explanations.
5. **Track progress** — XP, level, badges, streaks, and quiz history persist in `localStorage` and appear on your Profile and Dashboard.
6. **Climb the leaderboard** — your XP ranks you against other learners.

## Future Improvements

- **Backend persistence** — migrate from `localStorage` to Supabase for cross-device sync and real multiplayer leaderboards.
- **Question bank expansion** — community-submitted questions and difficulty tiers.
- **Adaptive difficulty** — adjust question difficulty based on performance.
- **More subjects** — DSA, system design, operating systems, and more.
- **Social features** — friend challenges, group quizzes, and shared streaks.
- **Analytics dashboard** — detailed performance breakdowns per subject and topic.
- **PWA support** — offline mode and push notifications for daily streak reminders.
- **Internationalization** — multi-language support.

## License

MIT — free to use, modify, and distribute.
