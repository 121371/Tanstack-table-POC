import { tableStyle, thStyle, tdStyle, actionTdStyle } from "../styles";

// Define the column type
type Column = {
  key: string;
  label: string;
  tooltip?: string;
};

// Define the data row type
export type Row = {
  id: string | number;
  [key: string]: string | number | boolean | undefined;
};

type DataTableProps = {
  columns: Column[];
  data: Row[];
  onEdit: (row: Row, index: number) => void;
  onDelete: (id: string | number) => void;
};

const DataTable = ({ columns, data, onEdit, onDelete }: DataTableProps) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={thStyle} title={col.tooltip}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {col.label}
                {col.tooltip && (
                  <span style={{ cursor: "help", color: "#888" }}>ⓘ</span>
                )}
              </span>
            </th>
          ))}
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id || index}>
            {columns.map((col) => (
              <td key={col.key} style={tdStyle}>
                {row[col.key]?.toString()}
              </td>
            ))}
            <td style={{ ...actionTdStyle, whiteSpace: "nowrap" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => onEdit(row, index)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this row?"
                    );
                    if (confirmed) {
                      onDelete(row.id);
                    }
                  }}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
