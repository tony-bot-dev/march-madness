/**
 * March Madness Bracket Simulator
 * Runs N full 64-team tournament simulations with team names
 */

// Teams by region and seed — mirrors teams.ts (source of truth)
const TEAMS = {
  south: {
    1: "Auburn",       2: "Michigan St",
    3: "Iowa State",   4: "Texas A&M",
    5: "Michigan",     6: "Mississippi St",
    7: "Marquette",    8: "Louisville",
    9: "Creighton",   10: "New Mexico",
    11: "San Diego St",12: "UC San Diego",
    13: "Yale",       14: "Lipscomb",
    15: "Bryant",     16: "Alabama St",
  },
  west: {
    1: "Florida",      2: "St. John's",
    3: "Texas Tech",   4: "Maryland",
    5: "Memphis",      6: "Missouri",
    7: "Kansas",       8: "UConn",
    9: "Oklahoma",    10: "Arkansas",
    11: "Drake",      12: "Colorado St",
    13: "Grand Canyon",14: "UNC Wilmington",
    15: "Omaha",      16: "Norfolk St",
  },
  east: {
    1: "Duke",         2: "Alabama",
    3: "Wisconsin",    4: "Arizona",
    5: "Oregon",       6: "BYU",
    7: "St. Mary's",   8: "Mississippi",
    9: "Baylor",      10: "Vanderbilt",
    11: "VCU",        12: "Liberty",
    13: "Akron",      14: "Montana",
    15: "Robert Morris",16: "Mount St. Mary's",
  },
  midwest: {
    1: "Houston",      2: "Tennessee",
    3: "Kentucky",     4: "Purdue",
    5: "Clemson",      6: "Illinois",
    7: "UCLA",         8: "Gonzaga",
    9: "Georgia",     10: "Utah State",
    11: "Texas",      12: "McNeese",
    13: "High Point", 14: "Troy",
    15: "Wofford",    16: "SIU Edwardsville",
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
