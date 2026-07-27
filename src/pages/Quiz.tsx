import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubject, type SubjectId } from '@/data/content';
import { useGame } from '@/hooks/useGame';

const TIME_PER_QUESTION = 20;

export default function Quiz() {
  const { subject = 'java' } = useParams();
  const subj = getSubject(subject as SubjectId);
  const navigate = useNavigate();
  const { addXp, recordQuiz } = useGame();

  // Shuffle a copy of questions for replayability
  const questions = useMemo(() => {
    return [...subj.questions].sort(() => Math.random() - 0.5);
  }, [subj]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [time, setTime] = useState(TIME_PER_QUESTION);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [answers, setAnswers] = useState<{ q: string; correct: number; chosen: number | null; explanation?: string }[]>([]);
  const [burst, setBurst] = useState<{ id: number; x: number; y: number; amount: number } | null>(null);
  const burstId = useRef(0);

  const total = questions.length;
  const q = questions[idx];

  // Per-question countdown. Auto-submits when time reaches zero.
  useEffect(() => {
    if (locked) return;
    if (time <= 0) {
      handleSelect(null);
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, locked]);

  function handleSelect(choice: number | null) {
    if (locked) return;
    setLocked(true);
    setSelected(choice);
    const isCorrect = choice === q.answer;
    let gained = 0;
    if (isCorrect) {
      // time bonus
      gained = q.xp + Math.floor(time / 4);
      setCorrectCount((c) => c + 1);
      setXpEarned((x) => x + gained);
      addXp(gained);
      // XP burst animation near center top
      burstId.current += 1;
      setBurst({ id: burstId.current, x: window.innerWidth / 2, y: window.innerHeight / 2 - 40, amount: gained });
      setTimeout(() => setBurst(null), 1100);
    }
    setAnswers((a) => [...a, { q: q.q, correct: q.answer, chosen: choice, explanation: q.explanation }]);
    void gained;
  }

  function next() {
    if (idx + 1 >= total) {
      const accuracy = Math.round((correctCount / total) * 100);
      recordQuiz({
        subject: subj.id,
        subjectName: subj.name,
        score: correctCount,
        total,
        xp: xpEarned,
        accuracy,
        date: new Date().toISOString(),
      });
      navigate('/result', {
        state: { subject: subj.name, score: correctCount, total, xp: xpEarned, accuracy, answers },
      });
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setLocked(false);
    setTime(TIME_PER_QUESTION);
  }

  const progress = ((idx + (locked ? 1 : 0)) / total) * 100;
  const timePct = (time / TIME_PER_QUESTION) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between fade-up">
        <div className="flex items-center gap-3">
          <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${subj.color} grid place-items-center text-xl`}>
            <i className={`fa-solid ${subj.icon} text-white`} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">{subj.name} Quiz</h1>
            <p className="text-xs opacity-60">Question {idx + 1} of {total}</p>
          </div>
        </div>

        {/* Timer */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle
              cx="32" cy="32" r="28" fill="none"
              stroke={time <= 5 ? '#f43f5e' : '#38BDF8'} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - timePct / 100)}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }}
            />
          </svg>
          <span className={`absolute inset-0 grid place-items-center font-display font-bold ${time <= 5 ? 'text-rose-400 timer-pulse' : ''}`}>
            {time}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div className="glass rounded-3xl p-7 fade-up" key={idx}>
        <h2 className="font-display text-xl sm:text-2xl font-semibold leading-snug mb-6">{q.q}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect = locked && i === q.answer;
            const isWrong = locked && i === selected && i !== q.answer;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={locked}
                className={`w-full text-left glass rounded-2xl px-5 py-4 flex items-center gap-3 transition-all ${
                  isCorrect ? 'border-emerald-400/70 bg-emerald-400/15' : ''
                } ${isWrong ? 'border-rose-400/70 bg-rose-400/15' : ''} ${
                  !locked ? 'hover:border-cyan-400/50 hover:translate-x-1' : 'cursor-default'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg grid place-items-center text-sm font-bold shrink-0 ${
                  isCorrect ? 'bg-emerald-400 text-emerald-950' :
                  isWrong ? 'bg-rose-400 text-rose-950' : 'glass'
                }`}>
                  {isCorrect ? <i className="fa-solid fa-check" /> : isWrong ? <i className="fa-solid fa-xmark" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm sm:text-base">{opt}</span>
              </button>
            );
          })}
        </div>

        {locked && (
          <div className="mt-6 space-y-4 fade-up">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                {selected === q.answer ? (
                  <span className="text-emerald-300 font-medium"><i className="fa-solid fa-circle-check mr-1" /> Correct! +{q.xp + Math.floor(time / 4)} XP</span>
                ) : (
                  <span className="text-rose-300 font-medium"><i className="fa-solid fa-circle-xmark mr-1" /> {selected === null ? 'Time\'s up!' : 'Not quite.'}</span>
                )}
              </p>
              <button onClick={next} className="btn-glow inline-flex items-center gap-2">
                {idx + 1 >= total ? 'See results' : 'Next'} <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
            <div className="glass rounded-2xl p-4 border-l-4 border-cyan-400/70">
              <p className="text-xs uppercase tracking-wider opacity-60 mb-1"><i className="fa-solid fa-lightbulb mr-1" /> Explanation</p>
              <p className="text-sm opacity-90">{q.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* XP burst */}
      {burst && (
        <div
          className="xp-burst"
          style={{ left: burst.x, top: burst.y, transform: 'translate(-50%,-50%)' }}
          key={burst.id}
        >
          +{burst.amount} XP
        </div>
      )}
    </div>
  );
}
