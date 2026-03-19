/**
 * March Madness Bracket Simulator
 * Runs N full 64-team tournament simulations with team names
 */

// Teams by region and seed — mirrors teams.ts (source of truth)
const TEAMS = {
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
    11: "Texas",        12: "High Point",
    13: "Hawaii",      14: "Kennesaw St",
    15: "Queens",      16: "LIU",
  },
  midwest: {
    1: "Michigan",      2: "Iowa St",
    3: "Virginia",      4: "Alabama",
    5: "Texas Tech",    6: "Tennessee",
    7: "Kentucky",      8: "Georgia",
    9: "Saint Louis",  10: "Santa Clara",
    11: "Miami OH",     12: "Akron",
    13: "Hofstra",     14: "Wright St",
    15: "Tennessee St", 16: "Howard",
  },
};

const REGIONS = ['south', 'west', 'east', 'midwest'];

// Standard NCAA first-round matchups by seed
const SEED_MATCHUPS = [
  [1, 16], [8, 9], [5, 12], [4, 13],
  [6, 11], [3, 14], [7, 10], [2, 15],
];

/**
 * Calculate win probability based on seed difference.
 * Lower seed number = better team.
 */
function getWinProbability(seed1, seed2) {
  const higherSeed = Math.min(seed1, seed2);
  const lowerSeed = Math.max(seed1, seed2);
  const seedDiff = lowerSeed - higherSeed;
  const baseWinRate = 0.65 + (seedDiff * 0.01);
  return Math.min(0.95, Math.max(0.05, baseWinRate));
}

/**
 * Simulate a single game between two teams.
 * Returns the winning team object.
 */
function simulateGame(team1, team2) {
  const prob = getWinProbability(team1.seed, team2.seed);
  // prob is chance the better-seeded team wins
  if (team1.seed <= team2.seed) {
    return Math.random() < prob ? team1 : team2;
  } else {
    return Math.random() < prob ? team2 : team1;
  }
}

/**
 * Simulate a single-elimination bracket for one region.
 * Returns the regional champion.
 */
function simulateRegion(region) {
  const teams = TEAMS[region];

  // Round of 64: 8 games per region
  let currentRound = [];
  for (const [seedA, seedB] of SEED_MATCHUPS) {
    const teamA = { seed: seedA, name: teams[seedA], region };
    const teamB = { seed: seedB, name: teams[seedB], region };
    currentRound.push(simulateGame(teamA, teamB));
  }

  // Round of 32, Sweet 16, Elite 8 (8 → 4 → 2 → 1)
  while (currentRound.length > 1) {
    const nextRound = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      nextRound.push(simulateGame(currentRound[i], currentRound[i + 1]));
    }
    currentRound = nextRound;
  }

  return currentRound[0];
}

/**
 * Run a full 64-team tournament simulation.
 * Returns the champion, finalist, and Final Four teams.
 */
function simulateTournament() {
  // Get regional champions
  const regionalChamps = REGIONS.map(r => simulateRegion(r));

  // Final Four: south vs west, east vs midwest
  const semi1Winner = simulateGame(regionalChamps[0], regionalChamps[1]);
  const semi2Winner = simulateGame(regionalChamps[2], regionalChamps[3]);
  const semi1Loser = regionalChamps[0] === semi1Winner ? regionalChamps[1] : regionalChamps[0];
  const semi2Loser = regionalChamps[2] === semi2Winner ? regionalChamps[3] : regionalChamps[2];

  // Championship
  const champion = simulateGame(semi1Winner, semi2Winner);
  const finalist = semi1Winner === champion ? semi2Winner : semi1Winner;

  return {
    champion,
    finalist,
    finalFour: [semi1Loser, semi2Loser],
  };
}

/**
 * Make a team key for aggregation
 */
function teamKey(team) {
  return `${team.region}-${team.seed}`;
}

/**
 * Run N simulations and aggregate results by team.
 */
function runSimulations(numSims = 100) {
  const champCounts = {};
  const finalistCounts = {};
  const finalFourCounts = {};

  for (let i = 0; i < numSims; i++) {
    const sim = simulateTournament();

    const ck = teamKey(sim.champion);
    champCounts[ck] = (champCounts[ck] || { ...sim.champion, count: 0 });
    champCounts[ck].count++;

    const fk = teamKey(sim.finalist);
    finalistCounts[fk] = (finalistCounts[fk] || { ...sim.finalist, count: 0 });
    finalistCounts[fk].count++;

    for (const t of sim.finalFour) {
      const ffk = teamKey(t);
      finalFourCounts[ffk] = (finalFourCounts[ffk] || { ...t, count: 0 });
      finalFourCounts[ffk].count++;
    }
  }

  const format = (obj) =>
    Object.values(obj)
      .map(({ seed, name, region, count }) => ({
        seed,
        teamName: name,
        region,
        count,
        percentage: ((count / numSims) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);

  return {
    champions: format(champCounts),
    finalists: format(finalistCounts),
    finalFour: format(finalFourCounts),
    totalSims: numSims,
    timestamp: new Date().toISOString(),
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runSimulations, getWinProbability };
}
