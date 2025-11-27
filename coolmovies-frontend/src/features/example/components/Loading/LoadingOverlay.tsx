import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../../../state";

export default function LoadingOverlay() {
  const open = useAppSelector((state) => state.loading.open);

  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
        backdropFilter: "blur(3px)",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
