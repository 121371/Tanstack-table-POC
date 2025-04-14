export const containerStyle = {
  border: "1px solid #e0e0e0",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  backgroundColor: "#fff",
  marginBottom: 40,
};

export const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

export const addButton = {
  padding: "8px 16px",
  backgroundColor: "#581d74",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableStyle: any = {
  width: "100%",
  borderCollapse: "collapse",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const thStyle: any = {
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  padding: 10,
  backgroundColor: "#f5f5f5",
};

export const tdStyle = {
  padding: 10,
  borderBottom: "1px solid #eee",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actionTdStyle: any = {
  textAlign: "center",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalStyle: any = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "30px 40px",
    transform: "translate(-50%, -50%) scale(1)",
    transition: "all 0.3s ease-in-out",
    width: "90vw",
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
  },
};

export const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export const cancelButton = {
  padding: "8px 16px",
  backgroundColor: "#581d74",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

export const submitButton = {
  padding: "8px 16px",
  backgroundColor: "#581d74",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

export const updateButton = {
  ...submitButton,
  backgroundColor: "#581d74",
};

// fieldStyles.ts
export const fieldContainer = {
  marginBottom: "24px",
  minWidth: "280px",
  paddingRight: "12px",
};

export const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "6px",
  fontWeight: 500,
};

export const tooltipStyle = {
  cursor: "pointer",
  fontSize: "14px",
  color: "#888",
};

export const errorStyle = {
  color: "red",
  fontSize: "13px",
  marginTop: "4px",
};
