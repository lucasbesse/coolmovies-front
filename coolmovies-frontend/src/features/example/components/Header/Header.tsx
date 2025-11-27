import { Paper } from "@mui/material";
import { styles } from "../../templates/Example";

export default function Header() {
  return (
    <Paper elevation={0} sx={{background: '#f0f5ffff', padding: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
      <img
        src="/logo.svg"
        alt="EcoPortal Logo"
        style={{
          height: 30,
          objectFit: "contain",
        }}
      />
    </Paper>
  );
}
