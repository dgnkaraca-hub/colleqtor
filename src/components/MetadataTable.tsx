interface Props {
  rows: [string, string][];
}

export default function MetadataTable({ rows }: Props) {
  return (
    <table className="meta-table">
      <tbody>
        {rows.map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
