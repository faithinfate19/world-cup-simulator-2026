export default function TeamSelector({ groups, setGroups, onResimulate }) {
  function randomize() {
    const allTeams = Object.values(groups).flat();
    const shuffled = [...allTeams].sort(() => Math.random() - 0.5);
    const keys = Object.keys(groups);
    const updated = {};
    keys.forEach((key, idx) => {
      updated[key] = shuffled.slice(idx * 4, idx * 4 + 4);
    });
    setGroups(updated);
  }

  return (
    <div className="selector-bar">
      <button onClick={randomize} className="btn-secondary">🔀 Randomize Groups</button>
      <button onClick={onResimulate} className="btn-primary">▶ Re-Simulate</button>
    </div>
  );
}