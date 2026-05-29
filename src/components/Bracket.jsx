import { motion } from "framer-motion";

const ROUND_LABELS = {
  roundOf32: "Round of 32",
  roundOf16: "Round of 16",
  quarterfinals: "Quarter Finals",
  semifinals: "Semi Finals",
  final: "Final"
};

export default function Bracket({ rounds }) {
  return (
    <div className="bracket-wrapper">
      <h2 className="bracket-title">🏆 Knockout Stage</h2>
      <div className="bracket">
        {Object.entries(rounds).map(([roundName, matches]) => (
          <div className="round" key={roundName}>
            <h3 className="round-label">{ROUND_LABELS[roundName] || roundName}</h3>
            <div className="round-matches">
              {matches.map((match, idx) => (
                <motion.div
                  className="bracket-match"
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <div className={`bracket-team ${match.winner === match.teamA ? "winner" : "loser"}`}>
                    <span className="team-name">{match.teamA}</span>
                    <span className="team-score">{match.scoreA}</span>
                  </div>
                  <div className="bracket-divider" />
                  <div className={`bracket-team ${match.winner === match.teamB ? "winner" : "loser"}`}>
                    <span className="team-name">{match.teamB}</span>
                    <span className="team-score">{match.scoreB}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}