'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import './simulate.css';

interface SimResult {
  seed: number;
  teamName: string;
  region: string;
  count: number;
  percentage: string;
}

interface SimResults {
  champions: SimResult[];
  finalists: SimResult[];
  finalFour: SimResult[];
  totalSims: number;
  timestamp: string;
}

// Stages that play out during animation (~3.5s total)
const STAGES = [
  { at: 0,  label: 'Loading bracket data...',         game: 0   },
  { at: 8,  label: 'Round of 64 — sim 1 of 100',      game: 64  },
  { at: 22, label: 'Round of 64 — sim 38 of 100',     game: 128 },
  { at: 36, label: 'Round of 32 — sim 54 of 100',     game: 256 },
  { at: 50, label: 'Sweet 16 — sim 67 of 100',        game: 384 },
  { at: 63, label: 'Elite 8 — sim 79 of 100',         game: 448 },
  { at: 74, label: 'Final Four — sim 91 of 100',      game: 512 },
  { at: 83, label: 'Championship — sim 98 of 100',    game: 563 },
  { at: 92, label: 'Crunching the numbers...',        game: 600 },
  { at: 98, label: 'Almost there...',                 game: 600 },
];

function getStageLabel(progress: number) {
  let label = STAGES[0].label;
  for (const s of STAGES) {
    if (progress >= s.at) label = s.label;
  }
  return label;
}

function ResultsSection({ title, data }: { title: string; data: SimResult[] }) {
  return (
    <div>
      <p className="sim-section-title">{title}</p>
      {data.map((item, idx) => (
        <div key={idx} className="sim-row">
          <span className="sim-row-label">{item.teamName} ({item.seed})</span>
          <div className="sim-row-right">
            <div className="sim-bar-track">
              <div
                className="sim-bar-fill"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="sim-pct">{item.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SimulatePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SimResults | null>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    // Tick up slowly: ~1.2% every 50ms → ~3.5 seconds to reach 98%
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 98) return p;
        // Slow near milestones for dramatic effect
        const step = p > 80 ? 0.5 : p > 50 ? 0.9 : 1.4;
        return Math.min(p + step + Math.random() * 0.4, 98);
      });
    }, 50);

    // Fire API call immediately — wait for both it AND minimum animation time
    const MIN_DURATION = 3500;
    const startTime = Date.now();

    try {
      const response = await fetch('/api/simulate-bracket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numSims: 100 }),
      });

      const data: SimResults = await response.json();

      // Wait out the remaining minimum duration before revealing results
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_DURATION) {
        await new Promise((r) => setTimeout(r, MIN_DURATION - elapsed));
      }

      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);

      // Short pause at 100% before showing results
      await new Promise((r) => setTimeout(r, 300));
      setResults(data);
    } catch (err) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(0);
      console.error('Simulation error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const copyResults = () => {
    if (!results) return;
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sim-page">
      <div className="sim-container">
        <Link href="/" className="sim-back">
          ← Back
        </Link>

        <div className="sim-header">
          <h1 className="sim-title">🏀 Simulate</h1>
          <p className="sim-subtitle">Run 100 tournament simulations. Who wins?</p>
        </div>

        {/* Run button */}
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="pebble-cta sim-run-btn"
        >
          {isRunning ? `Simulating... ${Math.floor(progress)}%` : 'Run 100 Simulations'}
        </button>

        {/* Progress bar */}
        {isRunning && (
          <div className="sim-progress-wrap">
            <div className="sim-progress-bar-track">
              <div className="sim-progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="sim-progress-label">{getStageLabel(progress)}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <>
            <div className="sim-results">
              <div className="card">
                <ResultsSection title="🏆 Most Likely Champions" data={results.champions.slice(0, 5)} />
              </div>
              <div className="card">
                <ResultsSection title="🥈 Runner-Up Odds" data={results.finalists.slice(0, 5)} />
              </div>
              <div className="card">
                <ResultsSection title="🏀 Final Four Appearances" data={results.finalFour.slice(0, 5)} />
              </div>
            </div>

            <div className="sim-actions">
              <button onClick={runSimulation} className="pebble-cta">
                Run Again
              </button>
              <button onClick={copyResults} className="btn-secondary">
                {copied ? '✓ Copied' : 'Copy Results'}
              </button>
            </div>

            <p className="sim-timestamp">
              {results.totalSims} simulations · {new Date(results.timestamp).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
