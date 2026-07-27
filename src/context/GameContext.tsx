import { createContext, useEffect, useState, type ReactNode } from 'react';
import { badges, subjects, type Badge, type SubjectId } from '@/data/content';

export interface QuizRecord {
  subject: SubjectId;
  subjectName: string;
  score: number;
  total: number;
  xp: number;
  accuracy: number;
  date: string;
}

export interface GameState {
  name: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastPlayed: string | null;   // ISO date (yyyy-mm-dd)
  subjectsTried: SubjectId[];
  history: QuizRecord[];
  earnedBadges: string[];
  darkMode: boolean;
  isLoggedIn: boolean;
}

const XP_PER_LEVEL = 500;

const defaultState: GameState = {
  name: 'Explorer',
  email: '',
  avatar: 'SQ',
  xp: 0,
  level: 1,
  streak: 0,
  lastPlayed: null,
  subjectsTried: [],
  history: [],
  earnedBadges: [],
  darkMode: true,
  isLoggedIn: false,
};

const KEY = 'skillquest_state_v1';

function load(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

interface GameContextType {
  state: GameState;
  addXp: (amount: number) => void;
  recordQuiz: (rec: QuizRecord) => void;
  unlockBadge: (id: string) => void;
  setProfile: (name: string, email: string) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  reset: () => void;
  levelProgress: number;   // 0-100 within current level
  xpToNext: number;
  newBadges: Badge[];      // badges unlocked since last check
  consumeNewBadges: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(load);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
    document.documentElement.classList.toggle('light-mode', !state.darkMode);
  }, [state]);

  function addXp(amount: number) {
    setState((s) => {
      const xp = s.xp + amount;
      const level = levelFromXp(xp);
      const earned = [...s.earnedBadges];
      const fresh: Badge[] = [];
      const tryUnlock = (id: string) => {
        if (!earned.includes(id)) {
          earned.push(id);
          const b = badges.find((x) => x.id === id);
          if (b) fresh.push(b);
        }
      };
      if (level >= 5) tryUnlock('level_5');
      if (level >= 10) tryUnlock('level_10');
      if (xp >= 500) tryUnlock('xp_500');
      if (fresh.length) setNewBadges((prev) => [...prev, ...fresh]);
      return { ...s, xp, level, earnedBadges: earned };
    });
  }

  function recordQuiz(rec: QuizRecord) {
    setState((s) => {
      const today = new Date().toISOString().slice(0, 10);
      let streak = s.streak;
      let lastPlayed = s.lastPlayed;
      if (s.lastPlayed !== today) {
        if (s.lastPlayed) {
          const diff = (Date.parse(today) - Date.parse(s.lastPlayed)) / 86400000;
          streak = diff === 1 ? s.streak + 1 : 1;
        } else {
          streak = 1;
        }
        lastPlayed = today;
      }
      const tried = Array.from(new Set([...s.subjectsTried, rec.subject]));
      const history = [rec, ...s.history].slice(0, 30);
      const earned = [...s.earnedBadges];
      const fresh: Badge[] = [];
      const tryUnlock = (id: string) => {
        if (!earned.includes(id)) {
          earned.push(id);
          const b = badges.find((x) => x.id === id);
          if (b) fresh.push(b);
        }
      };
      if (s.history.length === 0) tryUnlock('first_quiz');
      if (streak >= 3) tryUnlock('streak_3');
      if (streak >= 7) tryUnlock('streak_7');
      if (rec.accuracy === 100) tryUnlock('perfect');
      if (tried.length >= subjects.length) tryUnlock('scholar');
      if (fresh.length) setNewBadges((prev) => [...prev, ...fresh]);
      return { ...s, streak, lastPlayed, subjectsTried: tried, history, earnedBadges: earned };
    });
  }

  function unlockBadge(id: string) {
    setState((s) => {
      if (s.earnedBadges.includes(id)) return s;
      const b = badges.find((x) => x.id === id);
      if (b) setNewBadges((prev) => [...prev, b]);
      return { ...s, earnedBadges: [...s.earnedBadges, id] };
    });
  }

  function setProfile(name: string, email: string) {
    setState((s) => ({
      ...s,
      name: name || s.name,
      email,
      avatar: (name || email).slice(0, 2).toUpperCase() || s.avatar,
      isLoggedIn: true,
    }));
  }

  function logout() {
    setState((s) => ({ ...s, isLoggedIn: false }));
  }

  function toggleDarkMode() {
    setState((s) => ({ ...s, darkMode: !s.darkMode }));
  }

  function reset() {
    setState({ ...defaultState, darkMode: state.darkMode });
    setNewBadges([]);
  }

  const xpIntoLevel = state.xp % XP_PER_LEVEL;
  const levelProgress = (xpIntoLevel / XP_PER_LEVEL) * 100;
  const xpToNext = XP_PER_LEVEL - xpIntoLevel;

  function consumeNewBadges() {
    setNewBadges([]);
  }

  return (
    <GameContext.Provider
      value={{
        state, addXp, recordQuiz, unlockBadge, setProfile, logout, toggleDarkMode,
        reset, levelProgress, xpToNext, newBadges, consumeNewBadges,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
