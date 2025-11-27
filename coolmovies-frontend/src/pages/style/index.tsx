export const styles = {
  reviewText: (expanded: boolean) => ({
    fontSize: "0.95rem",
    color: "#333",
    maxHeight: expanded ? 220 : 110,
    overflowY: expanded ? "auto" : "hidden",
    transition: "0.2s ease",
    marginBottom: 2,

    ...( !expanded && {
      display: "-webkit-box",
      WebkitLineClamp: 5,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),

    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,0.3) transparent",

    "&::-webkit-scrollbar": { width: "6px" },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.35)",
      borderRadius: "8px",
    },
  }),
  reviewCard: {
    borderRadius: "24px",
    width: 360,
    height: 360,
    p: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
    backgroundColor: "white",
    border: "1px solid #cae4ffff",
  },
  reviewTitle: (expanded: boolean) => ({
    fontWeight: 700,
    mb: 1,
    maxWidth: "100%",

    ...( !expanded && {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        })
    }),
}
