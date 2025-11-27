export const styles = {
    movieCard:{
        width: 260,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        border: "1px solid #cae4ffff",
        backgroundColor: "white",
        transform: "translateY(0)",
        animation: "fadein 0.4s ease",
        transition: "0.2s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }
    },
    movieSmallCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 'max-content',
        padding: 1,
        borderRadius: 3,
        border: "1px solid #8ca5e2ff",
        boxShadow: 'none',
        backgroundColor: "#f0f5ffff",
    }
}