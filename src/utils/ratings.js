export function buildTeamRatings(matches) {
  const ratings = {};

  function ensure(team) {
    if (!ratings[team]) {
      ratings[team] = {
        elo: 1500,
        matches: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        wins: 0
      };
    }
  }

  matches.forEach((match) => {
    const home = match.home_team;
    const away = match.away_team;
    const hs = Number(match.home_score);
    const as = Number(match.away_score);

    if (Number.isNaN(hs) || Number.isNaN(as)) return;

    ensure(home);
    ensure(away);

    ratings[home].matches += 1;
    ratings[away].matches += 1;
    ratings[home].goalsFor += hs;
    ratings[home].goalsAgainst += as;
    ratings[away].goalsFor += as;
    ratings[away].goalsAgainst += hs;

    let homeExpected =
      1 / (1 + Math.pow(10, (ratings[away].elo - ratings[home].elo) / 400));

    let homeResult = 0.5;
    if (hs > as) {
      homeResult = 1;
      ratings[home].wins += 1;
    }
    if (hs < as) {
      homeResult = 0;
      ratings[away].wins += 1;
    }

    const k = 18;
    ratings[home].elo += k * (homeResult - homeExpected);
    ratings[away].elo += k * ((1 - homeResult) - (1 - homeExpected));
  });

  return ratings;
}