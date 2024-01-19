import { Paper, Box, Typography } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";
import products from "../../../fake_products_db.json";

export default function Homepage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box component={Paper} elevation={8} sx={{ m: 2, p: 2 }}>
        <Typography variant="h5">Filters</Typography>
      </Box>
      <Box component={Paper} elevation={8} sx={{ m: 2, p: 2 }}>
        <Catalog products={products} />
      </Box>
    </Box>
  );
}
