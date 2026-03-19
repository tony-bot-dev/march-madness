// 64 NCAA teams organized by region and seed
// 2026 NCAA Tournament bracket

export type Region = 'south' | 'west' | 'east' | 'midwest';

export const REGIONS: Region[] = ['south', 'west', 'east', 'midwest'];
export const REGION_LABELS: Record<Region, string> = {
  south: 'SOUTH',
  west: 'WEST',
  east: 'EAST',
  midwest: 'MIDWEST',
};

export const ROUNDS = ['r64', 'r32', 's16', 'e8'] as const;
export type Round = typeof ROUNDS[number];

export const ROUND_LABELS: Record<string, string> = {
  r64: 'ROUND OF 64',
  r32: 'ROUND OF 32',
  s16: 'SWEET 16',
  e8: 'ELITE 8',
  ff: 'FINAL FOUR',
  champ: 'CHAMPIONSHIP',
};

// Standard NCAA seed matchups in order
export const SEED_MATCHUPS: [number, number][] = [
  [1, 16], [8, 9], [5, 12], [4, 13],
  [6, 11], [3, 14], [7, 10], [2, 15],
];

// Teams by region, indexed by seed (1-16)
export const TEAMS: Record<Region, Record<number, string>> = {
  east: {
    1: "Duke",          2: "UConn",
    3: "Michigan St",   4: "Kansas",
    5: "St. John's",    6: "Louisville",
    7: "UCLA",          8: "Ohio St",
    9: "TCU",          10: "UCF",
    11: "South Florida",12: "N. Iowa",
    13: "Cal Baptist", 14: "N. Dakota St",
    15: "Furman",      16: "Siena",
  },
  south: {
    1: "Florida",       2: "Houston",
    3: "Illinois",      4: "Nebraska",
    5: "Vanderbilt",    6: "North Carolina",
    7: "Saint Mary's",  8: "Clemson",
    9: "Iowa",         10: "Texas A&M",
    11: "VCU",         12: "McNeese",
    13: "Troy",        14: "Penn",
    15: "Idaho",       16: "Prairie View A&M",
  },
  west: {
    1: "Arizona",       2: "Purdue",
    3: "Gonzaga",       4: "Arkansas",
    5: "Wisconsin",     6: "BYU",
    7: "Miami",         8: "Villanova",
    9: "Utah St",      10: "Missouri",
    11: "Texas",12: "High Point",
    13: "Hawaii",      14: "Kennesaw St",
    15: "Queens",      16: "LIU",
  },
  midwest: {
    1: "Michigan",      2: "Iowa St",
    3: "Virginia",      4: "Alabama",
    5: "Texas Tech",    6: "Tennessee",
    7: "Kentucky",      8: "Georgia",
    9: "Saint Louis",  10: "Santa Clara",
    11: "Miami OH", 12: "Akron",
    13: "Hofstra",     14: "Wright St",
    15: "Tennessee St", 16: "Howard",
  },
};

// Build a team key from region and seed
export function teamKey(region: Region, seed: number): string {
  return `${region}-${seed}`;
}

// Get team name from a team key
export function teamName(key: string): string {
  const [region, seedStr] = key.split('-');
  const seed = parseInt(seedStr);
  return TEAMS[region as Region]?.[seed] ?? 'TBD';
}

// Get team seed from a team key
export function teamSeed(key: string): number {
  return parseInt(key.split('-')[1]);
}

// Scoring: points per round
export const SCORING: Record<string, number> = {
  r64: 1,
  r32: 2,
  s16: 4,
  e8: 8,
  ff: 16,
  champ: 32,
};
