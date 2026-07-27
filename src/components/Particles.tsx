import { useEffect, useMemo, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const colors = ['#38BDF8', '#2563EB', '#7C3AED', '#ffffff'];

export default function Particles({ count = 22 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 7,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 12,
        color: colors[i % colors.length],
      }))
    );
  }, [count]);

  const items = useMemo(() => particles, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
