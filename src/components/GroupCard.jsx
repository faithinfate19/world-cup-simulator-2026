import MatchCard from "./MatchCard";
import GroupTable from "./GroupTable";

export default function GroupCard({ name, group }) {
    return (
        <div className="group-card">
            <h3>Group {name}</h3>
            <div className="matches">
                {group.matches.map((match, idx) => (
                    <MatchCard key={idx} match={match} />
                ))}
            </div>
            <GroupTable table={group.table} />
        </div>
    );
}