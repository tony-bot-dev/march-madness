# Next Year Fixes — Tony's Bracket 2027

Things to fix before Selection Sunday 2027.

## 🐛 Final Four Pairing Bug (CRITICAL — fix first)

### The bug

In [lib/bracket-logic.ts](lib/bracket-logic.ts) lines 38–41, the Elite 8 → Final Four feed map pairs the wrong regions:

```typescript
// CURRENT (WRONG)
map['south-e8-1']   = { target: 'ff-1', slot: 'top' };
map['west-e8-1']    = { target: 'ff-1', slot: 'bot' };
map['east-e8-1']    = { target: 'ff-2', slot: 'top' };
map['midwest-e8-1'] = { target: 'ff-2', slot: 'bot' };
```

This makes:
- `ff-1` = South champ vs West champ
- `ff-2` = East champ vs Midwest champ

### Why it's wrong

The NCAA bracket has a fixed layout where the four regions sit on two sides of the bracket. The two regions on the same side meet in the Final Four, NOT cross-paired.

In the official 2026 CBS bracket:
- **Left side:** East (top-left) and South (bottom-left)
- **Right side:** West (top-right) and Midwest (bottom-right)

So the correct Final Four semifinals are:
- **Left semifinal:** East champ vs South champ
- **Right semifinal:** West champ vs Midwest champ

### The fix

```typescript
// CORRECT
map['east-e8-1']    = { target: 'ff-1', slot: 'top' };
map['south-e8-1']   = { target: 'ff-1', slot: 'bot' };
map['west-e8-1']    = { target: 'ff-2', slot: 'top' };
map['midwest-e8-1'] = { target: 'ff-2', slot: 'bot' };
```

### What happened in 2026

The actual semifinals played:
- UConn (East) def. Illinois (South) 71–62 — left-side semifinal
- Michigan (Midwest) def. Arizona (West) 91–73 — right-side semifinal
- Championship: Michigan def. UConn 69–63

But our bracket UI had told users the Final Four would be:
- ff-1: Illinois (South) vs Arizona (West) — **never happened in real life**
- ff-2: UConn (East) vs Michigan (Midwest) — **happened, but as the championship game**

When users filled out their brackets in March, they were picking based on wrong matchups. Someone could pick "Arizona beats Illinois in ff-1 then Arizona wins it all" — a prediction about a game that physically couldn't occur in the real bracket.

### How 2026 was scored (workaround)

Since the structure didn't match reality, the following judgment calls were made in [lib/tournament-results.ts](lib/tournament-results.ts):

1. **`ff-2` → `midwest-1`** (Michigan): In our broken structure ff-2 was UConn vs Michigan, and Michigan did beat UConn (just in the championship instead of the semifinal). Picks of Michigan for ff-2 got the 16 points.
2. **`ff-1` → left unset**: Illinois vs Arizona never happened, so nobody scored those 16 points.
3. **`champ` → `midwest-1`** (Michigan): Unambiguous, Michigan won.

This wasn't perfectly fair — the 16 unrecoverable points for ff-1 affected everyone equally, but users who would have correctly picked "the East champ to beat the South champ" or "the West champ to beat the Midwest champ" got no credit.

### Verification after fix

After applying the fix above, run a sanity test:
- Make a test bracket where you pick the East 1-seed to win the East region, the South 1-seed to win the South region, and the East 1-seed to beat the South 1-seed in the Final Four.
- The Final Four matchup in the UI should show **East 1-seed vs South 1-seed** in `ff-1`, not `ff-1` showing South vs West.
- Confirm that `ff-2` shows West champ vs Midwest champ.

---

## 🛠 Other Improvements to Consider

### Auto-fetch results
The cron-based "search the web for scores" workflow worked but required Claude to be running and approving each commit. Consider:
- A standalone Node.js script using a sports API (ESPN, NCAA, etc.)
- Vercel Cron / GitHub Actions to run it on a schedule
- Bypass the human-approval requirement entirely

### Round key consistency
The codebase uses `s16` for Sweet 16 in [lib/bracket-logic.ts](lib/bracket-logic.ts) but the natural abbreviation is `r16`. We hit this bug in 2026 — initial Sweet 16 results were committed with `r16` keys and didn't score until they were renamed to `s16`. Consider adding a runtime check or const-asserted union type for game IDs to catch typos at build time.

### First Four / play-in games
The 2026 bracket had First Four games (e.g., Texas/NC State for the West 11-seed). The current bracket logic just uses the seed number and ignores the play-in. If we want to track those, we'd need a small extension.

### Pairing bug regression test
Add a test that asserts the feed map matches the official NCAA bracket layout (East–South, West–Midwest). This would catch a regression of the bug above immediately.

---

## 📋 Pre-Tournament Checklist (2027)

Before Selection Sunday:

- [ ] Apply the Final Four pairing fix above
- [ ] Add the regression test
- [ ] Update [lib/teams.ts](lib/teams.ts) with the new 64-team field once Selection Sunday is over
- [ ] Update [lib/bracketSim.js](lib/bracketSim.js) to mirror teams.ts
- [ ] Update [lib/site-config.ts](lib/site-config.ts) name to "Tony's Bracket 2027"
- [ ] Set `BRACKETS_LOCKED = false` in [lib/tournament-results.ts](lib/tournament-results.ts) and clear the previous year's `ACTUAL_RESULTS`
- [ ] Wipe or archive old brackets in Supabase before the new tournament opens
