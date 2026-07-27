import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

// Re-exported hook so consumers can call useGame() without importing the
// context object directly. Kept in its own file to satisfy React Fast Refresh
// (a file should only export components, not mixed components + hooks).
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
