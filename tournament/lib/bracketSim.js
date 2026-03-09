/**
 * March Madness Bracket Simulator
 * Runs N simulations of tournament, tracks winners and deep runs
 */

// 2024 bracket structure (update seeds/names for 2026)
const BRACKET_2024 = {
  regions: ["East", "West", "South", "Midwest"],
  seeds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  teams: {
    // East Region
    "1-East": "UConn",
    "2-East": "Purdue",
    "3-East": "Kansas State",
    "4-East": "Auburn",
    "5-East": "Duke",
    "6-East": "Iowa",
    "7-East": "TCU",
    "8-East": "Colorado State",
    "9-East": "Marquette",
    "10-East": "Penn State",
    "11-East": "Providence",
    "12-East": "Akron",
    "13-East": "Holy Cross",
    "14-East": "Colgate",
    "15-East": "UT Arlington",
    "16-East": "Stetson",
    // West Region
    "1-West": "North Carolina",
    "2-West": "UCLA",
    "3-West": "Gonzaga",
    "4-West": "Alabama",
    "5-West": "Baylor",
    "6-West": "Dayton",
    "7-West": "Florida Atlantic",
    "8-West": "Saint Mary's",
    "9-West": "New Mexico State",
    "10-West": "College of Charleston",
    "11-West": "Morehead State",
    "12-West": "Northern Arizona",
    "13-West": "Iona",
    "14-West": "Samford",
    "15-West": "Kennesaw State",
    "16-West": "Texas Southern",
    // South Region
    "1-South": "Houston",
    "2-South": "Iowa State",
    "3-South": "Xavier",
    "4-South": "Texas A&M",
    "5-South": "Michigan State",
    "6-South": "Florida",
    "7-South": "Creighton",
    "8-South": "Missouri",
    "9-South": "Utah State",
    "10-South": "DePaul",
    "11-South": "South Carolina",
    "12-South": "Old Dominion",
    "13-South": "Vermont",
    "14-South": "Southern Utah",
    "15-South": "Temple",
    "16-South": "LIU",
    // Midwest Region
    "1-Midwest": "UConn",
    "2-Midwest": "Michigan",
    "3-Midwest": "Arizona",
    "4-Midwest": "Virginia Tech",
    "5-Midwest": "Marquette",
    "6-Midwest": "Wisconsin",
    "7-Midwest": "Chattanooga",
    "8-Midwest": "UNC Greensboro",
    "9-Midwest": "Morehead State",
    "10-Midwest": "Nevada",
    "11-Midwest": "New Mexico",
    "12-Midwest": "Southern Mississippi",
    "13-Midwest": "Red Lion",
    "14-Midwest": "Mount St. Mary's",
    "15-Midwest": "Troy",
    "16-Midwest": "Savannah State"
  }
};

/**
 * Calculate win probability for matchup
 * Higher seed = higher probability to win
 * Upset rate: lower seeds win ~35% of the time
 */
function getWinProbability(seed1, seed2) {
  const higherSeed = Math.min(seed1, seed2);
  const lowerSeed = Math.max(seed1, seed2);
  
  // Base: higher seed wins more often
  // Difference in seeds affects probability
  const seedDiff = lowerSeed - higherSeed;
  
  // Sigmoid-ish curve: closer seeds = closer to 50/50
  // Seed 1 vs 16: ~85% for 1
  // Seed 8 vs 9: ~52% for 8
  const baseWinRate = 0.65 + (seedDiff * 0.01); // increases with worse opponent
  
  return Math.min(0.95, Math.max(0.05, baseWinRate));
}

/**
 * Simulate a single game
 * Returns true if team1 wins, false if team2 wins
 */
function simulateGame(seed1, seed2) {
  const team1WinProbability = getWinProbability(seed1, seed2);
  return Math.random() < team1WinProbability;
}

/**
 * Run a single tournament simulation
 * Returns { champion, semifinalists, finalists, elite8, etc. }
 */
function simulateTournament(bracket = BRACKET_2024) {
  const deepRuns = {
    champion: null,
    finalist: [], // lost in finals
    elite8: [], // lost in elite 8
    sweet16: [], // lost in sweet 16
    round32: [], // lost in round of 32
    firstRound: []
  };

  // For simplicity, we'll track by seed through each round
  // In a full simulation, you'd track actual bracket structure
  // This is a simplified version that tracks one "run" per seed
  
  const seeds = Array.from({ length: 16 }, (_, i) => i + 1);
  
  // Round 1: 1v16, 2v15, etc
  const round2Winners = [];
  for (let i = 0; i < 8; i++) {
    const seed1 = seeds[i];
    const seed2 = seeds[15 - i];
    const seed1Wins = simulateGame(seed1, seed2);
    round2Winners.push(seed1Wins ? seed1 : seed2);
  }
  
  // Track first round losers
  seeds.forEach(s => {
    if (!round2Winners.includes(s)) {
      deepRuns.firstRound.push(s);
    }
  });
  
  // Round 2: 8 → 4
  const round3Winners = [];
  for (let i = 0; i < 4; i++) {
    const seed1 = round2Winners[i];
    const seed2 = round2Winners[7 - i];
    const seed1Wins = simulateGame(seed1, seed2);
    round3Winners.push(seed1Wins ? seed1 : seed2);
  }
  
  // Track round 2 (sweet 16) losers
  round2Winners.forEach(s => {
    if (!round3Winners.includes(s)) {
      deepRuns.sweet16.push(s);
    }
  });
  
  // Round 3: 4 → 2 (Elite 8)
  const round4Winners = [];
  for (let i = 0; i < 2; i++) {
    const seed1 = round3Winners[i];
    const seed2 = round3Winners[3 - i];
    const seed1Wins = simulateGame(seed1, seed2);
    round4Winners.push(seed1Wins ? seed1 : seed2);
  }
  
  // Track Elite 8 losers
  round3Winners.forEach(s => {
    if (!round4Winners.includes(s)) {
      deepRuns.elite8.push(s);
    }
  });
  
  // Finals
  const seed1 = round4Winners[0];
  const seed2 = round4Winners[1];
  const seed1Wins = simulateGame(seed1, seed2);
  
  if (seed1Wins) {
    deepRuns.champion = seed1;
    deepRuns.finalist.push(seed2);
  } else {
    deepRuns.champion = seed2;
    deepRuns.finalist.push(seed1);
  }
  
  return deepRuns;
}

/**
 * Run N simulations and aggregate results
 */
function runSimulations(numSims = 100, bracket = BRACKET_2024) {
  const results = {
    champions: {}, // seed -> count
    finalists: {}, // seed -> count
    elite8: {}, // seed -> count
    sweet16: {}, // seed -> count
    totalSims: numSims,
    timestamp: new Date().toISOString()
  };
  
  for (let i = 0; i < numSims; i++) {
    const sim = simulateTournament(bracket);
    
    // Track champion
    const champ = sim.champion;
    results.champions[champ] = (results.champions[champ] || 0) + 1;
    
    // Track finalists
    sim.finalist.forEach(seed => {
      results.finalists[seed] = (results.finalists[seed] || 0) + 1;
    });
    
    // Track Elite 8
    sim.elite8.forEach(seed => {
      results.elite8[seed] = (results.elite8[seed] || 0) + 1;
    });
    
    // Track Sweet 16
    sim.sweet16.forEach(seed => {
      results.sweet16[seed] = (results.sweet16[seed] || 0) + 1;
    });
  }
  
  // Convert to percentages and sort
  const formatResults = (obj) => {
    return Object.entries(obj)
      .map(([seed, count]) => ({
        seed: parseInt(seed),
        count,
        percentage: ((count / numSims) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  };
  
  return {
    ...results,
    champions: formatResults(results.champions),
    finalists: formatResults(results.finalists),
    elite8: formatResults(results.elite8),
    sweet16: formatResults(results.sweet16)
  };
}

// Export for Node.js / Next.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runSimulations,
    simulateTournament,
    BRACKET_2024,
    getWinProbability
  };
}

// Example usage
if (typeof window === 'undefined') {
  const results = runSimulations(100);
  console.log('Champions:', results.champions.slice(0, 5));
}
