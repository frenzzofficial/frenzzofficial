const Loading = () => {
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}
      </style>

      <div style={styles.spinner} />
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.25rem",
    backgroundColor: "#0d1117",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "3px solid #30363d",
    borderTopColor: "#58a6ff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    color: "#8b949e",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.02em",
    animation: "pulse 1.6s ease-in-out infinite",
  },
};

export default Loading;
