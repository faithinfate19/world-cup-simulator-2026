export default function GroupTable({ table }) {
    return (
        <table className="group-table">
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Pts</th>
                    <th>GD</th>
                    <th>GF</th>
                </tr>
            </thead>
            <tbody>
                {table.map((team) => (
<tr key={team.team}>
<td>{team.team}</td>
<td>{team.pts}</td>
<td>{team.gd}</td>
<td>{team.gf}</td>
</tr>
))}
        </tbody>
</table >
);
}