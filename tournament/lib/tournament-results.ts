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
  'east-r64-3': 'east-5',   // St. John's (5) def. N. Iowa (12)
  'east-r64-4': 'east-4',   // Kansas (4) def. Cal Baptist (13)
  'east-r64-5': 'east-6',   // Louisville (6) def. South Florida (11)
  'east-r64-6': 'east-3',   // Michigan St (3) def. N. Dakota St (14)
  'east-r64-7': 'east-7',   // UCLA (7) def. UCF (10)
  'east-r64-8': 'east-2',   // UConn (2) def. Furman (15)

  // === SOUTH REGION ===
  'south-r64-1': 'south-1',  // Florida (1) def. Prairie View A&M (16)
  'south-r64-2': 'south-9',  // Iowa (9) def. Clemson (8)
  'south-r64-3': 'south-5',  // Vanderbilt (5) def. McNeese (12)
  'south-r64-4': 'south-4',  // Nebraska (4) def. Troy (13)
  'south-r64-5': 'south-11', // VCU (11) def. North Carolina (6) OT
  'south-r64-7': 'south-10', // Texas A&M (10) def. Saint Mary's (7)
  'south-r64-6': 'south-3',  // Illinois (3) def. Penn (14)
  'south-r64-8': 'south-2',  // Houston (2) def. Idaho (15)

  // === WEST REGION ===
  'west-r64-1': 'west-1',   // Arizona (1) def. LIU (16)
  'west-r64-2': 'west-9',   // Utah St (9) def. Villanova (8)
  'west-r64-3': 'west-12',  // High Point (12) def. Wisconsin (5)
  'west-r64-4': 'west-4',   // Arkansas (4) def. Hawaii (13)
  'west-r64-5': 'west-11',  // Texas (11) def. BYU (6)
  'west-r64-6': 'west-3',   // Gonzaga (3) def. Kennesaw St (14)
  'west-r64-7': 'west-7',   // Miami (7) def. Missouri (10)
  'west-r64-8': 'west-2',   // Purdue (2) def. Queens (15)

  // === MIDWEST REGION ===
  'midwest-r64-1': 'midwest-1',  // Michigan (1) def. Howard (16)
  'midwest-r64-2': 'midwest-9',  // Saint Louis (9) def. Georgia (8)
  'midwest-r64-3': 'midwest-5',  // Texas Tech (5) def. Akron (12)
  'midwest-r64-4': 'midwest-4',  // Alabama (4) def. Hofstra (13)
  'midwest-r64-5': 'midwest-6',  // Tennessee (6) def. Miami OH (11)
  'midwest-r64-6': 'midwest-3',  // Virginia (3) def. Wright St (14)
  'midwest-r64-7': 'midwest-7',  // Kentucky (7) def. Santa Clara (10) OT
  'midwest-r64-8': 'midwest-2',  // Iowa State (2) def. Tennessee St (15)

  // === ROUND OF 32 ===
  // EAST
  'east-r32-1': 'east-1',        // Duke (1) def. TCU (9)
  'east-r32-2': 'east-5',        // St. John's (5) def. Kansas (4)
  'east-r32-3': 'east-3',        // Michigan St (3) def. Louisville (6)
  'east-r32-4': 'east-2',        // UConn (2) def. UCLA (7)
  // SOUTH
  'south-r32-1': 'south-9',      // Iowa (9) def. Florida (1)
  'south-r32-2': 'south-4',      // Nebraska (4) def. Vanderbilt (5)
  'south-r32-3': 'south-3',      // Illinois (3) def. VCU (11)
  'south-r32-4': 'south-2',      // Houston (2) def. Texas A&M (10)
  // WEST
  'west-r32-1': 'west-1',        // Arizona (1) def. Utah St (9)
  'west-r32-2': 'west-4',        // Arkansas (4) def. High Point (12)
  'west-r32-3': 'west-11',       // Texas (11) def. Gonzaga (3)
  'west-r32-4': 'west-2',        // Purdue (2) def. Miami (7)
  // MIDWEST
  'midwest-r32-1': 'midwest-1',  // Michigan (1) def. Saint Louis (9)
  'midwest-r32-2': 'midwest-4',  // Alabama (4) def. Texas Tech (5)
  'midwest-r32-3': 'midwest-6',  // Tennessee (6) def. Virginia (3)
  'midwest-r32-4': 'midwest-2',  // Iowa State (2) def. Kentucky (7)

  // === SWEET 16 (March 26-27) ===
  // WEST (Thursday March 26)
  'west-r16-1': 'west-1',        // Arizona (1) def. Arkansas (4) 109-88
  'west-r16-2': 'west-2',        // Purdue (2) def. Texas (11) 79-77
  // SOUTH (Thursday March 26)
  'south-r16-1': 'south-9',      // Iowa (9) def. Nebraska (4) 77-71
  'south-r16-2': 'south-3',      // Illinois (3) def. Houston (2) 65-55
  // EAST (Friday March 27)
  'east-r16-1': 'east-1',        // Duke (1) def. St. John's (5) 80-75
  'east-r16-2': 'east-2',        // UConn (2) def. Michigan St (3) 67-63
  // MIDWEST (Friday March 27)
  'midwest-r16-1': 'midwest-1',  // Michigan (1) def. Alabama (4) 90-77
  'midwest-r16-2': 'midwest-6',  // Tennessee (6) def. Iowa State (2) 76-62
};
