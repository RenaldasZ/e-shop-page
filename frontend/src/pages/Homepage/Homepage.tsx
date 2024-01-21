import { Paper, Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Pagination, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { CatalogContext, FilterOptions } from "../../context/CatalogContext";


export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const { currentPage, setCurrentPage, products, setProducts, uniqueBrands, uniqueSizes, uniquePrice, filterOptions, setFilterOptions } =
    useContext(CatalogContext);

  const productsPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange =  (category: keyof FilterOptions, value: string) => {
     setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [category]: {
        ...prevFilterOptions[category],
        [value]: !prevFilterOptions[category][value],
      },
    }));
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
      console.log(filterOptions);

      const tempProducts = products.filter((product) => {
        return (
          (filterOptions.brands[product.brand] || Object.values(filterOptions.brands).every((value) => !value)) &&
          (filterOptions.sizes[product.productSize] || Object.values(filterOptions.sizes).every((value) => !value)) &&
          (filterOptions.prices[product.price.toString()] || Object.values(filterOptions.prices).every((value) => !value))
        );
      });

      setFilteredProducts(tempProducts);
      setTotalCount(tempProducts.length / productsPerPage);

      if (Math.floor(tempProducts.length / productsPerPage) === 0) {
        setCurrentPage(1);
      }
    }
  };
  applyFilters();
    }, [products, setCurrentPage, filterOptions]);

  if (loading) {
    return <LoadingComponent message="Loading Products" />;
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);
  
  const mql = window.matchMedia('(max-width: 900px)');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Accordion defaultExpanded={!mql.matches}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
              <FormLabel>
                <Typography variant='h6'>Select Brand</Typography>
                </FormLabel>
                <FormGroup>
                  <Grid container>
                    {uniqueBrands?.map((brand, index) => (
                      <Grid key={index} md={6} item>
                        <FormControlLabel control={<Checkbox name={brand} checked={filterOptions.brands[brand]} onChange={() => handleCheckboxChange('brands', brand)} />} label={brand} />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </FormControl>
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
