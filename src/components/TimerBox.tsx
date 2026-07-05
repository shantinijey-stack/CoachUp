import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ActivityTimer } from "../data/content";

function formatSeconds(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function RoundButton({
  onClick,
  children,
  tone = "go",
}: {
  onClick: () => void;
  children: React.ReactNode;
  tone?: "go" | "stop" | "neutral";
}) {
  const tones = {
    go: "bg-lagoon text-white",
    stop: "bg-coral text-white",
    neutral: "bg-deepsea/10 text-deepsea",
  };
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`${tones[tone]} font-display font-bold text-sm rounded-2xl px-4 py-2.5 shadow-pop`}
    >
      {children}
    </motion.button>
  );
}

/**
 * Game-style timer box for movement activities.
 * countdown → play for N seconds; stopwatch → time the attempt;
 * counter → tap to count reps toward a target.
 */
export default function TimerBox({ timer }: { timer: ActivityTimer }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isCountdown = timer.mode === "countdown";
  const total = timer.seconds ?? 0;
  const remaining = Math.max(0, total - elapsed);
  const done = isCountdown && running === false && elapsed >= total && total > 0;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (isCountdown && running && elapsed >= total) setRunning(false);
  }, [isCountdown, running, elapsed, total]);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    setCount(0);
  };

  if (timer.mode === "counter") {
    const target = timer.target ?? 10;
    const hit = count >= target;
    return (
      <div className="bg-gradient-to-br from-deepsea to-lagoon rounded-3xl shadow-card p-4 mb-4 text-white">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
          ⏱️ {timer.label}
        </p>
        <div className="flex items-center gap-4">
          <div className="font-display font-extrabold text-4xl tabular-nums w-24">
            {count}
            <span className="text-lg opacity-60"> / {target}</span>
          </div>
          <div className="flex-1 flex gap-1.5 flex-wrap">
            {Array.from({ length: target }, (_, i) => (
              <motion.span
                key={i}
                className={`w-4 h-4 rounded-full ${i < count ? "bg-sunshine" : "bg-white/20"}`}
                animate={i === count - 1 ? { scale: [1.4, 1] } : undefined}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {hit ? (
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex-1 font-display font-bold text-sunshine self-center"
            >
              🎉 {target} in a row — champion catch!
            </motion.p>
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setCount((c) => Math.min(target, c + 1))}
              className="flex-1 bg-sunshine text-deepsea font-display font-extrabold text-lg rounded-2xl py-3 shadow-pop"
            >
              Caught one! +1 🎾
            </motion.button>
          )}
          <RoundButton tone="neutral" onClick={reset}>↺</RoundButton>
        </div>
      </div>
    );
  }

  const display = isCountdown ? remaining : elapsed;

  return (
    <div className="bg-gradient-to-br from-deepsea to-lagoon rounded-3xl shadow-card p-4 mb-4 text-white">
      <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
        ⏱️ {timer.label}
      </p>
      <div className="flex items-center gap-4">
        <motion.div
          className="font-display font-extrabold text-4xl tabular-nums"
          animate={running ? { scale: [1, 1.04, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {formatSeconds(display)}
        </motion.div>
        <div className="flex-1">
          {isCountdown && (
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-sunshine rounded-full"
                initial={false}
                animate={{ width: `${total ? (remaining / total) * 100 : 0}%` }}
                transition={{ duration: 0.9, ease: "linear" }}
              />
            </div>
          )}
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-sunshine mt-1"
            >
              ⭐ Time's up — amazing effort!
            </motion.p>
          )}
          {!isCountdown && !running && elapsed > 0 && (
            <p className="font-display font-bold text-sunshine">
              ⭐ {elapsed} second{elapsed === 1 ? "" : "s"} — great try!
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        {running ? (
          <RoundButton tone="stop" onClick={() => setRunning(false)}>
            ⏸ Stop
          </RoundButton>
        ) : (
          <RoundButton
            tone="go"
            onClick={() => {
              if (done) setElapsed(0);
              setRunning(true);
            }}
          >
            ▶ {elapsed > 0 && !done ? "Resume" : "Start"}
          </RoundButton>
        )}
        <RoundButton tone="neutral" onClick={reset}>↺ Reset</RoundButton>
      </div>
    </div>
  );
}
