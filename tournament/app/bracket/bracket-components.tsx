'use client';

import {
  type GameSlots,
} from '@/lib/bracket-logic';
import {
  REGION_LABELS,
  teamName,
  teamSeed,
  type Region,
} from '@/lib/teams';

export function RegionBracket({
  region,
  slots,
  picks,
  locked,
  onPick,
  mirrored,
  results,
  actuallyAdvanced,
}: {
  region: Region;
  slots: Record<string, GameSlots>;
  picks: Record<string, string>;
  locked: boolean;
  onPick: (gameId: string, teamKey: string) => void;
  mirrored: boolean;
  results: Record<string, string>;
  actuallyAdvanced: Map<string, string>;
}) {
  const regionClass = `region region-${region} ${mirrored ? 'mirrored' : ''}`;

  const rounds = [
    { key: 'r64', count: 8, label: 'R64' },
    { key: 'r32', count: 4, label: 'R32' },
    { key: 's16', count: 2, label: 'S16' },
    { key: 'e8', count: 1, label: 'E8' },
  ];

  return (
    <div className={regionClass}>
      <span className="region-label">{REGION_LABELS[region]}</span>
      {rounds.map((round) => (
        <div key={round.key} className="round">
          {Array.from({ length: round.count }, (_, i) => {
            const gameId = `${region}-${round.key}-${i + 1}`;
            return (
              <MatchupSlot
                key={gameId}
                gameId={gameId}
                slots={slots}
                picks={picks}
                locked={locked}
                onPick={onPick}
                results={results}
                actuallyAdvanced={actuallyAdvanced}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function MatchupSlot({
  gameId,
  slots,
  picks,
  locked,
  onPick,
  results,
  actuallyAdvanced,
  className = '',
}: {
  gameId: string;
  slots: Record<string, GameSlots>;
  picks: Record<string, string>;
  locked: boolean;
  onPick: (gameId: string, teamKey: string) => void;
  results: Record<string, string>;
  actuallyAdvanced: Map<string, string>;
  className?: string;
}) {
  const gameSlots = slots[gameId];
  if (!gameSlots) return null;

  const picked = picks[gameId];
  const actualWinner = results[gameId] || null;

  const topAdvancedTeam = actuallyAdvanced.get(`${gameId}-top`);
  const botAdvancedTeam = actuallyAdvanced.get(`${gameId}-bot`);
  const topAdvanced = topAdvancedTeam === gameSlots.top && !!gameSlots.top;
  const botAdvanced = botAdvancedTeam === gameSlots.bot && !!gameSlots.bot;
  const topWrongProjection = !!topAdvancedTeam && topAdvancedTeam !== gameSlots.top && !!gameSlots.top;
  const botWrongProjection = !!botAdvancedTeam && botAdvancedTeam !== gameSlots.bot && !!gameSlots.bot;

  return (
    <div className={`matchup ${className}`}>
      <TeamSlotView
        teamKeyVal={gameSlots.top}
        isPicked={picked === gameSlots.top && !!gameSlots.top}
        isEliminated={!!picked && picked !== gameSlots.top && !!gameSlots.top}
        isActualWinner={actualWinner === gameSlots.top && !!gameSlots.top}
        isActualLoser={!!actualWinner && actualWinner !== gameSlots.top && !!gameSlots.top}
        isActuallyAdvanced={topAdvanced}
        isWrongProjection={topWrongProjection}
        isLocked={locked}
        onClick={() => {
          if (gameSlots.top && !locked) onPick(gameId, gameSlots.top);
        }}
      />
      <TeamSlotView
        teamKeyVal={gameSlots.bot}
        isPicked={picked === gameSlots.bot && !!gameSlots.bot}
        isEliminated={!!picked && picked !== gameSlots.bot && !!gameSlots.bot}
        isActualWinner={actualWinner === gameSlots.bot && !!gameSlots.bot}
        isActualLoser={!!actualWinner && actualWinner !== gameSlots.bot && !!gameSlots.bot}
        isActuallyAdvanced={botAdvanced}
        isWrongProjection={botWrongProjection}
        isLocked={locked}
        onClick={() => {
          if (gameSlots.bot && !locked) onPick(gameId, gameSlots.bot);
        }}
      />
    </div>
  );
}

function TeamSlotView({
  teamKeyVal,
  isPicked,
  isEliminated,
  isActualWinner,
  isActualLoser,
  isActuallyAdvanced,
  isWrongProjection,
  isLocked,
  onClick,
}: {
  teamKeyVal: string | null;
  isPicked: boolean;
  isEliminated: boolean;
  isActualWinner: boolean;
  isActualLoser: boolean;
  isActuallyAdvanced: boolean;
  isWrongProjection: boolean;
  isLocked: boolean;
  onClick: () => void;
}) {
  if (!teamKeyVal) {
    return (
      <div className="team-slot empty">
        <span className="slot-seed">-</span>
        <span className="slot-name">TBD</span>
      </div>
    );
  }

  const name = teamName(teamKeyVal);
  const seed = teamSeed(teamKeyVal);
  const classes = [
    'team-slot',
    isPicked ? 'picked' : '',
    isEliminated ? 'eliminated' : '',
    isActualWinner ? 'actual-winner' : '',
    isActualLoser ? 'actual-loser' : '',
    isActuallyAdvanced ? 'actually-advanced' : '',
    isWrongProjection ? 'wrong-projection' : '',
    isLocked ? 'locked' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick}>
      <span className="slot-seed">{seed}</span>
      <span className="slot-name">{name}</span>
      {isActualWinner && <span className="result-badge winner-badge">W</span>}
      {isActualLoser && <span className="result-badge loser-badge">L</span>}
    </div>
  );
}
