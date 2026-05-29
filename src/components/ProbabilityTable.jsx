export default function ProbabilityTable({ probabilities }) {
const sorted = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);
return (
<div className="prob-table">
<h2>Championship Odds</h2>
{sorted.map(([team, prob]) => (
<div className="prob-row" key={team}>
<span>{team}</span>
<span>{prob.toFixed(1)}%</span>
</div>
))}
</div>
);
}
