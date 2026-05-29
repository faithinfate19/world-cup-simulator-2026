import { motion } from "framer-motion";
export default function MatchCard({ match }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="match-card"
        >
            <div className="teams">
                <span>{match.teamA}</span>
                <strong>
                    {match.scoreA} - {match.scoreB}
                </strong>
                <span>{match.teamB}</span>
            </div>
            <div className="probability">
                Win Chance: {(match.probabilityA * 100).toFixed(1)}%
            </div>
        </motion.div>
    );
}