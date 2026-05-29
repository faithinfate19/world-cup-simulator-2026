import { getWinProbability } from "./probability";

function randomGoals(strength) {
  return Math.max(0, Math.round(Math.random() * strength * 4));
}

export function simulateMatch(teamA, teamB, ratings) {
  const pA = getWinProbability(teamA, teamB, ratings);

  let scoreA = randomGoals(pA);
  let scoreB = randomGoals(1 - pA);

  // Break draws in knockout by nudging one score — winner must match scoreline
  // (for group stage, draws are valid and handled in simulateGroup)
  let winner;
  if (scoreA > scoreB) {
    winner = teamA;
  } else if (scoreB > scoreA) {
    winner = teamB;
  } else {
    // Drawn — use probability to decide who scores the extra (penalties/ET)
    if (Math.random() < pA) {
      scoreA += 1;
      winner = teamA;
    } else {
      scoreB += 1;
      winner = teamB;
    }
  }

  return {
    teamA,
    teamB,
    scoreA,
    scoreB,
    winner,
    probabilityA: pA
  };
}

export function createRoundRobin(teams) {
  return [
    [teams[0], teams[1]],
    [teams[2], teams[3]],
    [teams[0], teams[2]],
    [teams[1], teams[3]],
    [teams[0], teams[3]],
    [teams[1], teams[2]]
  ];
}

export function simulateGroup(groupTeams, ratings) {
  const standings = {};
  groupTeams.forEach((team) => {
    standings[team] = {
      team, pts: 0, gf: 0, ga: 0, gd: 0, wins: 0, draws: 0, losses: 0
    };
  });

  const fixtures = createRoundRobin(groupTeams);
  const matches = fixtures.map(([a, b]) => {
    const result = simulateMatch(a, b, ratings);
    const sa = standings[a];
    const sb = standings[b];

    sa.gf += result.scoreA;
    sa.ga += result.scoreB;
    sb.gf += result.scoreB;
    sb.ga += result.scoreA;
    sa.gd = sa.gf - sa.ga;
    sb.gd = sb.gf - sb.ga;

    if (result.scoreA > result.scoreB) {
      sa.pts += 3; sa.wins += 1; sb.losses += 1;
    } else if (result.scoreB > result.scoreA) {
      sb.pts += 3; sb.wins += 1; sa.losses += 1;
    } else {
      sa.pts += 1; sb.pts += 1; sa.draws += 1; sb.draws += 1;
    }
    return result;
  });

  const table = Object.values(standings).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });

  return {
    matches,
    table,
    qualified: [table[0].team, table[1].team],
    third: table[2]
  };
}

export function selectBestThirds(thirdPlaces) {
  const sorted = [...thirdPlaces].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
  return sorted.slice(0, 8).map((t) => t.team);
}