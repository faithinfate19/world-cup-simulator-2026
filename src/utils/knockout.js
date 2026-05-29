import { simulateMatch } from "./simulator";

/**
 * 2026 World Cup knockout format:
 * - 12 groups × 2 qualifiers = 24 top-2 teams
 * - 8 best 3rd-place teams
 * - Total: 32 teams → Round of 32 → R16 → QF → SF → Final
 *
 * The 32 teams are seeded so that group winners face 3rd-place teams
 * and runners-up face each other where possible (simplified bracket).
 */
export function buildKnockoutBracket(groupWinners, groupRunnersUp, bestThirds) {
  // Pair winners vs best thirds (slots 1–8), runners-up vs runners-up (slots 9–16)
  // Simplified: interleave so each winner faces a 3rd-place team
  const bracket = [];
  for (let i = 0; i < 8; i++) {
    bracket.push(groupWinners[i]);
    bracket.push(bestThirds[i]);
  }
  for (let i = 8; i < 12; i++) {
    bracket.push(groupWinners[i]);
    bracket.push(groupRunnersUp[i - 8]);
  }
  for (let i = 4; i < 12; i++) {
    bracket.push(groupRunnersUp[i]);
  }
  // Trim/pad to exactly 32
  return bracket.slice(0, 32);
}

export function simulateKnockout(teams32, ratings) {
  let current = [...teams32];

  const rounds = {
    roundOf32: [],
    roundOf16: [],
    quarterfinals: [],
    semifinals: [],
    final: []
  };

  function playRound(roundName) {
    const next = [];
    for (let i = 0; i < current.length; i += 2) {
      const match = simulateMatch(current[i], current[i + 1], ratings);
      rounds[roundName].push(match);
      next.push(match.winner);
    }
    current = next;
  }

  playRound("roundOf32");
  playRound("roundOf16");
  playRound("quarterfinals");
  playRound("semifinals");
  playRound("final");

  return {
    rounds,
    champion: current[0]
  };
}