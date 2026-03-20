// Global lock — set to true to prevent all bracket changes
export const BRACKETS_LOCKED = true;

// Actual tournament results — update as games are played
// Key: game_id (e.g., "east-r64-2"), Value: winner team key (e.g., "east-9")
//
// Game IDs follow the pattern: {region}-{round}-{game_number}
// Team keys follow the pattern: {region}-{seed}
//
// SEED_MATCHUPS order (determines game numbers within r64):
//   Game 1: [1, 16]  Game 2: [8, 9]  Game 3: [5, 12]  Game 4: [4, 13]
//   Game 5: [6, 11]  Game 6: [3, 14]  Game 7: [7, 10]  Game 8: [2, 15]

export const ACTUAL_RESULTS: Record<string, string> = {
  // === EAST REGION ===
  'east-r64-1': 'east-1',   // Duke (1) def. Siena (16)
  'east-r64-2': 'east-9',   // TCU (9) def. Ohio St (8)
  'east-r64-5': 'east-6',   // Louisville (6) def. South Florida (11)
  'east-r64-6': 'east-3',   // Michigan St (3) def. N. Dakota St (14)

  // === SOUTH REGION ===
  'south-r64-3': 'south-5',  // Vanderbilt (5) def. McNeese (12)
  'south-r64-4': 'south-4',  // Nebraska (4) def. Troy (13)
  'south-r64-5': 'south-11', // VCU (11) def. North Carolina (6) OT
  'south-r64-7': 'south-10', // Texas A&M (10) def. Saint Mary's (7)
  'south-r64-6': 'south-3',  // Illinois (3) def. Penn (14)
  'south-r64-8': 'south-2',  // Houston (2) def. Idaho (15)

  // === WEST REGION ===
  'west-r64-3': 'west-12',  // High Point (12) def. Wisconsin (5)
  'west-r64-4': 'west-4',   // Arkansas (4) def. Hawaii (13)
  'west-r64-5': 'west-11',  // Texas (11) def. BYU (6)
  'west-r64-6': 'west-3',   // Gonzaga (3) def. Kennesaw St (14)

  // === MIDWEST REGION ===
  'midwest-r64-1': 'midwest-1',  // Michigan (1) def. Howard (16)
  'midwest-r64-2': 'midwest-9',  // Saint Louis (9) def. Georgia (8)
};
