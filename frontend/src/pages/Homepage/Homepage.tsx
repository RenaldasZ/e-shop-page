import { Paper, Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Pagination } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import products from "../../../fake_products_db.json";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

export default function Homepage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    agent.Catalog.getProducts(currentPage)
      .then((response) => {
        setProducts(response.results);
        setTotalCount(response.count);
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [currentPage]);

  if (loading) {
    return <LoadingComponent message="Loading Products" />;
  }

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
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mb: 5, position: "relative" }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Pagination
            count={Math.ceil(totalCount / 6)}
            page={currentPage}
            onChange={(_e, page) => handlePageChange(page)}
            variant="outlined"
            shape="rounded"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
