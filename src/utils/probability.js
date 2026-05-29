export function getWinProbability(teamA, teamB, ratings) {
const ratingA = ratings[teamA]?.elo || 1500;
const ratingB = ratings[teamB]?.elo || 1500;
const probabilityA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
return probabilityA;
}
