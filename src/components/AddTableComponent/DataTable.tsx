import { tableStyle, thStyle, tdStyle, actionTdStyle } from "../styles";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete

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
  onEdit: (row: Row, index: number) => void; // Pass index for editing
  onDelete: (id: string | number) => void;
};

const DataTable = ({ columns, data, onEdit, onDelete }: DataTableProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%", // Ensure the table container fills the full height
        overflow: "auto", // Enable scrolling for overflowing content
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex", // Use flexbox to center the empty message
        flexDirection: "column",
      }}
    >
      <table
        style={{
          ...tableStyle,
          tableLayout: "auto", // Allow dynamic column widths
          width: "100%",
          borderSpacing: "0 10px", // Add spacing between rows
          flexGrow: 1, // Allow the table to grow and fill the container
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  ...thStyle,
                  padding: "12px 16px", // Add padding for better spacing
                  textAlign: "left",
                  minWidth: "120px", // Reduced minimum width for each column
                }}
                title={col.tooltip}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {col.label}
                  {col.tooltip && (
                    <span style={{ cursor: "help", color: "#888" }}>ⓘ</span>
                  )}
                </span>
              </th>
            ))}
            <th
              style={{
                ...thStyle,
                padding: "12px 12px", // Add padding for the actions column
                textAlign: "left",
                minWidth: "50px", // Minimum width for the actions column
                position: "sticky", // Make the column sticky
                right: 0, // Stick to the right edge
                backgroundColor: "#f5f5f5", // Match the table header background color
                zIndex: 2, // Ensure it stays above other content
                boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)", // Add shadow for better separation
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Alternate row colors
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      ...tdStyle,
                      padding: "12px 16px", // Add padding for better spacing
                      minWidth: "120px", // Reduced minimum width for each cell
                    }}
                  >
                    {row[col.key]?.toString()}
                  </td>
                ))}
                <td
                  style={{
                    ...actionTdStyle,
                    padding: "12px 16px", // Add padding for the actions column
                    whiteSpace: "nowrap",
                    minWidth: "50px", // Minimum width for the actions column
                    position: "sticky", // Make the column sticky
                    right: 0, // Stick to the right edge
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Match the row background color
                    boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)", // Add shadow for better separation
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => onEdit(row, index)} // Pass row and index
                      style={{
                        padding: "4px",
                        backgroundColor: "#581d74", // Updated background color
                        color: "#fff", // Updated text color
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Edit"
                    >
                      <FaEdit />
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
                        padding: "4px",
                        backgroundColor: "#581d74", // Updated background color
                        color: "#fff", // Updated text color
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1} // Span across all columns including "Actions"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#888",
                  fontStyle: "italic",
                  position: "sticky", // Make the "No data available" message sticky
                  left: 0, // Stick to the left edge
                  backgroundColor: "#fff", // Match the table background
                  zIndex: 1, // Ensure it stays above other content
                }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
