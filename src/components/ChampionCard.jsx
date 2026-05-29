import { motion } from "framer-motion";

export default function ChampionCard({ champion }) {
  if (!champion) return null;
  return (
    <motion.div
      className="champion-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="champion-trophy">🏆</div>
      <p className="champion-label">PREDICTED WORLD CHAMPION</p>
      <h1 className="champion-name">{champion}</h1>
      <p className="champion-sub">FIFA World Cup 2026 · USA · Canada · Mexico</p>
    </motion.div>
  );
}