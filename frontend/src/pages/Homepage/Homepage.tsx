import { Paper, Box } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";

export default function Homepage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box component={Paper} elevation={8} sx={{ m: 2, p: 2 }}>
        <Catalog />
      </Box>
    </Box>
  );
}
