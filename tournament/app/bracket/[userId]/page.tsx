'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  buildFeedMap,
  buildInitialSlots,
  getAllGameIds,
  TOTAL_GAMES,
  type GameSlots,
} from '@/lib/bracket-logic';
import { teamName } from '@/lib/teams';
import { ACTUAL_RESULTS } from '@/lib/tournament-results';
import { RegionBracket, MatchupSlot } from '../bracket-components';
import '../bracket.css';

const FEED_MAP = buildFeedMap();

export default function ViewBracketPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [slots, setSlots] = useState<Record<string, GameSlots>>(buildInitialSlots);
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/brackets?userId=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.bracket) {
          setDisplayName(data.bracket.users?.display_name || 'Unknown');
          const savedPicks = data.bracket.picks || {};
          replayPicks(savedPicks);
        } else {
          setNotFound(true);
        }
        setLoaded(true);
      })
      .catch(() => {
        setNotFound(true);
        setLoaded(true);
      });
  }, [userId]);

  function replayPicks(savedPicks: Record<string, string>) {
    let currentSlots = buildInitialSlots();
    const orderedIds = getAllGameIds();

    orderedIds.forEach((gameId) => {
      if (savedPicks[gameId]) {
        const tk = savedPicks[gameId];
        const feed = FEED_MAP[gameId];
        if (feed) {
          currentSlots[feed.target] = {
            ...currentSlots[feed.target],
            [feed.slot]: tk,
          };
        }
      }
    });

    setPicks(savedPicks);
    setSlots(currentSlots);
  }

  const actuallyAdvanced = useMemo(() => {
    const map = new Map<string, string>();
    for (const [gameId, winner] of Object.entries(ACTUAL_RESULTS)) {
      const feed = FEED_MAP[gameId];
      if (feed) {
        map.set(`${feed.target}-${feed.slot}`, winner);
      }
    }
    return map;
  }, []);

  const pickCount = Object.keys(picks).length;
  const pct = Math.round((pickCount / TOTAL_GAMES) * 100);
  const champion = picks['champ'] ? teamName(picks['champ']) : null;

  // No-op for read-only view
  const noop = () => {};

  if (!loaded) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p className="data-mono">Loading bracket...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
        <p className="data-mono">Bracket not found.</p>
        <Link href="/leaderboard" className="btn-secondary">Back to Leaderboard</Link>
      </div>
    );
  }

  return (
    <>
      <header className="bracket-header">
        <div className="bracket-header-left">
          <Link href="/">
            <Image src="/images/dunk.png" alt="Logo" width={60} height={60} style={{ width: 60, height: 'auto' }} />
          </Link>
          <h1 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--orange)' }}>{displayName?.toUpperCase()}&apos;S</span> BRACKET
          </h1>
        </div>

        <div className="bracket-header-center">
          <div className="progress-wrap">
            <div className="progress-bar-outer">
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="progress-text">{pickCount}/{TOTAL_GAMES}</span>
          </div>
          <span className="progress-text" style={{ color: '#55ff55' }}>VIEW ONLY</span>
        </div>

        <div className="bracket-header-right">
          <Link href="/leaderboard" className="btn-secondary">
            Leaderboard
          </Link>
          <Link href="/bracket" className="btn-secondary">
            My Bracket
          </Link>
        </div>
      </header>

      <Image
        src="/images/dunk.png"
        alt=""
        width={800}
        height={800}
        className="bracket-watermark"
      />

      <div className="bracket-wrapper">
        <div className="bracket-grid">
          <RegionBracket region="south" slots={slots} picks={picks} locked={true} onPick={noop} mirrored={false} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} />
          <RegionBracket region="west" slots={slots} picks={picks} locked={true} onPick={noop} mirrored={false} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} />

          <div className="center-column">
            <div>
              <p className="ff-label">Final Four</p>
              <MatchupSlot gameId="ff-1" slots={slots} picks={picks} locked={true} onPick={noop} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} className="final-four-matchup" />
            </div>
            <div>
              <p className="ff-label">Championship</p>
              <MatchupSlot gameId="champ" slots={slots} picks={picks} locked={true} onPick={noop} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} className="final-four-matchup" />
            </div>
            <div className={`champion-display ${champion ? 'has-winner' : ''}`}>
              <p className="champion-label">2026 Champion</p>
              <p className="champion-name">{champion || 'TBD'}</p>
            </div>
            <div>
              <p className="ff-label">Final Four</p>
              <MatchupSlot gameId="ff-2" slots={slots} picks={picks} locked={true} onPick={noop} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} className="final-four-matchup" />
            </div>
          </div>

          <RegionBracket region="east" slots={slots} picks={picks} locked={true} onPick={noop} mirrored={true} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} />
          <RegionBracket region="midwest" slots={slots} picks={picks} locked={true} onPick={noop} mirrored={true} results={ACTUAL_RESULTS} actuallyAdvanced={actuallyAdvanced} />
        </div>
      </div>
    </>
  );
}
