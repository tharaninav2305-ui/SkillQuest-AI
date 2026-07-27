import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from '@/context/GameContext';
import Layout from '@/components/Layout';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Quiz from '@/pages/Quiz';
import Result from '@/pages/Result';
import Leaderboard from '@/pages/Leaderboard';
import Profile from '@/pages/Profile';

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/login" element={<Layout><Auth mode="login" /></Layout>} />
          <Route path="/signup" element={<Layout><Auth mode="signup" /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/quiz/:subject" element={<Layout><Quiz /></Layout>} />
          <Route path="/result" element={<Layout><Result /></Layout>} />
          <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
