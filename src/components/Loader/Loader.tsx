const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000, // Ensure it appears above all other elements
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #fff",
          borderTop: "5px solid #1976d2", // Spinner color
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
