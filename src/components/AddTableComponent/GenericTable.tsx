import { tableStyle, thStyle, tdStyle, actionTdStyle } from "../styles";
import { FaEdit, FaTrash } from "react-icons/fa";

type Column<T> = {
  key: keyof T;
  label: string;
  tooltip?: string;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T, index: number) => void;
  onDelete?: (id: T[keyof T]) => void;
  idKey: keyof T; // Key to uniquely identify rows
  noDataMessage?: string; // Customizable "No data available" message
};

const GenericTable = <T extends Record<string, unknown>>({
  columns,
  data,
  onEdit,
  onDelete,
  idKey,
  noDataMessage = "No data available",
}: GenericTableProps<T>) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <table
        style={{
          ...tableStyle,
          tableLayout: "auto",
          width: "100%",
          borderSpacing: "0 10px",
          flexGrow: 1,
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                style={{
                  ...thStyle,
                  padding: "8px 12px", // Reduced padding for less spacing in the header
                  textAlign: "left",
                  minWidth: "120px",
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
            {(onEdit || onDelete) && (
              <th
                style={{
                  ...thStyle,
                  padding: "12px 12px",
                  textAlign: "left",
                  minWidth: "50px",
                  position: "sticky",
                  right: 0,
                  backgroundColor: "#f5f5f5",
                  zIndex: 2,
                  boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row[idKey] as string | number}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    style={{
                      ...tdStyle,
                      padding: "8px 12px", // Reduced padding for less spacing between column values
                      minWidth: "120px",
                    }}
                  >
                    {row[col.key]?.toString()}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td
                    style={{
                      ...actionTdStyle,
                      padding: "12px 16px",
                      whiteSpace: "nowrap",
                      minWidth: "50px",
                      position: "sticky",
                      right: 0,
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                      boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row, index)}
                          style={{
                            padding: "4px",
                            backgroundColor: "#581d74",
                            color: "#fff",
                            border: "none", // Remove border
                            borderRadius: 4,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none", // Remove blue outline on focus
                            transition: "opacity 0.2s ease-in-out", // Add smooth transition for hover effect
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.8")
                          } // Reduce opacity on hover
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          } // Restore opacity on mouse leave
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure you want to delete this row?"
                            );
                            if (confirmed) {
                              onDelete(row[idKey]);
                            }
                          }}
                          style={{
                            padding: "4px",
                            backgroundColor: "#581d74",
                            color: "#fff",
                            border: "none", // Remove border
                            borderRadius: 4,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none", // Remove blue outline on focus
                            transition: "opacity 0.2s ease-in-out", // Add smooth transition for hover effect
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.8")
                          } // Reduce opacity on hover
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          } // Restore opacity on mouse leave
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
