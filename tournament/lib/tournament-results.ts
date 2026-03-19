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
  'east-r64-2': 'east-9',   // TCU (9) def. Ohio St (8)

  // === SOUTH REGION ===
  'south-r64-4': 'south-4',  // Nebraska (4) def. Troy (13)

  // === WEST REGION ===

  // === MIDWEST REGION ===
};
