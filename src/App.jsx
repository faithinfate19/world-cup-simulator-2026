import { useEffect, useState } from "react";
import Header from "./components/header";
import GroupCard from "./components/GroupCard";
import ChampionCard from "./components/ChampionCard";
import Bracket from "./components/Bracket";
import ProbabilityTable from "./components/ProbabilityTable";
import TeamSelector from "./components/TeamSelector";
import { initialGroups } from "./data/groups";
import { loadCSV } from "./utils/csvParser";
import { buildTeamRatings } from "./utils/ratings";
import { simulateGroup, selectBestThirds } from "./utils/simulator";
import { simulateKnockout, buildKnockoutBracket } from "./utils/knockout";
import "./index.css";

export default function App() {
  const [groups, setGroups] = useState(initialGroups);
  const [groupResults, setGroupResults] = useState({});
  const [bracket, setBracket] = useState(null);
  const [champion, setChampion] = useState(null);
  const [probabilities, setProbabilities] = useState({});
  const [loading, setLoading] = useState(true);

  async function runSimulation() {
    setLoading(true);
    const matches = await loadCSV();
    const ratings = buildTeamRatings(matches);

    const groupSimulations = {};
    const groupWinners = [];
    const groupRunnersUp = [];
    const allThirds = [];

    Object.entries(groups).forEach(([groupName, teams]) => {
      const result = simulateGroup(teams, ratings);
      groupSimulations[groupName] = result;
      groupWinners.push(result.qualified[0]);
      groupRunnersUp.push(result.qualified[1]);
      allThirds.push({ ...result.third, group: groupName });
    });

    const bestThirds = selectBestThirds(allThirds);

    // Build 32-team bracket
    const teams32 = buildKnockoutBracket(groupWinners, groupRunnersUp, bestThirds);

    const knockout = simulateKnockout(teams32, ratings);
    setGroupResults(groupSimulations);
    setBracket(knockout.rounds);
    setChampion(knockout.champion);

    // Monte Carlo for championship odds (500 simulations)
    const counts = {};
    for (let i = 0; i < 500; i++) {
      const k = simulateKnockout(teams32, ratings);
      counts[k.champion] = (counts[k.champion] || 0) + 1;
    }
    const probs = {};
    Object.keys(counts).forEach((team) => {
      probs[team] = (counts[team] / 500) * 100;
    });
    setProbabilities(probs);
    setLoading(false);
  }

  useEffect(() => {
    runSimulation();
  }, [groups]);

  return (
    <div className="app">
      <Header />
      <TeamSelector groups={groups} setGroups={setGroups} onResimulate={runSimulation} />
      {loading ? (
        <div className="loading-screen">
          <div className="loading-ball">⚽</div>
          <p>Simulating tournament…</p>
        </div>
      ) : (
        <>
          {champion && <ChampionCard champion={champion} />}
          <ProbabilityTable probabilities={probabilities} />
          <section className="groups-grid">
            {Object.entries(groupResults).map(([name, group]) => (
              <GroupCard key={name} name={name} group={group} />
            ))}
          </section>
          {bracket && <Bracket rounds={bracket} />}
        </>
      )}
    </div>
  );
}