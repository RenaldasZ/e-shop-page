import { Paper, Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import products from "../../../fake_products_db.json";

export default function Homepage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Filters Will Be Added Here</Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper elevation={8} sx={{ p: 2, width: "100%" }}>
          <Catalog products={products} />
        </Paper>
      </Grid>
    </Grid>
  );
}
