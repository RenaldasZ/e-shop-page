import { Paper, Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Pagination } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { CatalogContext } from "../../context/CatalogContext";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const { currentPage, setCurrentPage, products, setProducts, uniqueBrands, uniqueSizes, uniquePrice } =
    useContext(CatalogContext);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const productsPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    agent.Catalog.getAllProducts()
      .then((response) => {
        setProducts(response.results);
        setFilteredProducts(response.results);
        setTotalCount(response.results.length / productsPerPage);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setProducts]);

  // console.log(uniqueBrands, uniqueSizes, uniquePrice);

  useEffect(() => {
    const applyFilters = () => {
      if (products) {
        const tempProducts = products.filter((product) => {
          return (
            (selectedBrand ? product.brand === selectedBrand : true) &&
            (selectedSize ? product.productSize === selectedSize : true) &&
            (selectedPrice ? product.price === selectedPrice : true)
          );
        });

        setFilteredProducts(tempProducts);
        setTotalCount(tempProducts.length / productsPerPage);
        setCurrentPage(1);
      }
    };

    applyFilters();
  }, [products, setCurrentPage, selectedBrand, selectedSize, selectedPrice]);

  if (loading) {
    return <LoadingComponent message="Loading Products" />;
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);

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
          <Catalog products={currentProducts!} />
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Pagination
            count={Math.ceil(totalCount)}
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
