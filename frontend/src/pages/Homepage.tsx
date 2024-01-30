import {
  Paper,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Pagination,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import Catalog from "../components/Catalog/Catalog";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useContext, useEffect } from "react";
import { CatalogContext, FilterOptions } from "../context/CatalogContext";

export default function Homepage() {
  const {
    currentPage,
    setCurrentPage,
    products,
    uniqueBrands,
    uniqueSizes,
    uniquePrice,
    filterOptions,
    setFilterOptions,
    totalCount,
    filteredProducts,
    setFilteredProducts,
    setTotalCount,
  } = useContext(CatalogContext);

  const productsPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (category: keyof FilterOptions, value: string) => {
    setFilterOptions((prevFilterOptions) => {
      const categoryOptions = prevFilterOptions[category];
      if (typeof categoryOptions !== "object" || categoryOptions === null) {
        return prevFilterOptions;
      }
      return {
        ...prevFilterOptions,
        [category]: {
          ...categoryOptions,
          [value]: !categoryOptions[value],
        },
      };
    });
  };

  const handleSliderChange = (value: number | number[]) => {
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      maxPrice: value as number,
    }));

    if (Math.floor((filteredProducts?.length ?? 0) / productsPerPage) > 1 || filteredProducts?.length === 0) {
      return setCurrentPage(1);
    }

    setCurrentPage(Math.floor((filteredProducts?.length ?? 0) / productsPerPage));
  };

  useEffect(() => {
    const applyFilters = () => {
      if (products) {
        const tempProducts = products.filter((product) => {
          const meetsBrandCriteria =
            filterOptions.brands[product.brand] || Object.values(filterOptions.brands).every((value) => !value);
          const meetsSizeCriteria =
            filterOptions.sizes[product.productSize] || Object.values(filterOptions.sizes).every((value) => !value);
          const meetsPriceCriteria = !filterOptions.maxPrice || product.price <= filterOptions.maxPrice;

          return meetsBrandCriteria && meetsSizeCriteria && meetsPriceCriteria;
        });

        setFilteredProducts(tempProducts);
        setTotalCount(tempProducts.length / productsPerPage);

        if (Math.floor((tempProducts.length - 1) / productsPerPage) == 0) {
          setCurrentPage(1);
        }
      }
    };
    applyFilters();
  }, [products, setCurrentPage, filterOptions, setFilteredProducts, setTotalCount]);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);

  const mql = window.matchMedia("(max-width: 900px)");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Accordion defaultExpanded={!mql.matches}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography variant="h5">Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormLabel>
                  <Typography variant="h6">Select Brand</Typography>
                </FormLabel>
                <FormGroup>
                  <Grid container>
                    {uniqueBrands?.map((brand, index) => (
                      <Grid key={index} md={6} item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={brand}
                              checked={filterOptions.brands[brand]}
                              onChange={() => handleCheckboxChange("brands", brand)}
                            />
                          }
                          label={brand}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>

                <FormLabel sx={{ mt: 2 }}>
                  <Typography variant="h6">Select Size</Typography>
                </FormLabel>
                <FormGroup>
                  <Grid container>
                    {uniqueSizes?.map((size, index) => (
                      <Grid key={index} md={6} item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={size}
                              checked={filterOptions.sizes[size]}
                              onChange={() => handleCheckboxChange("sizes", size)}
                            />
                          }
                          label={size}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
                <FormGroup>
                  <FormLabel sx={{ mt: 2 }}>
                    <Typography variant="h6">Select Max Price (€)</Typography>
                  </FormLabel>
                  <Slider
                    value={filterOptions.maxPrice! / 100 || 0}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    max={
                      uniquePrice && uniquePrice.length > 0 ? Math.max(...uniquePrice.map((price) => price / 100)) : 0
                    }
                    onChange={(e: any) => {
                      handleSliderChange(e.target.value * 100);
                      // console.log(e.target.value);
                    }}
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper elevation={8} sx={{ p: 2, width: "100%" }}>
          {currentProducts?.length === 0 ? (
            <Typography variant="h3" textAlign="center">
              No Products Found
            </Typography>
          ) : (
            <Catalog products={currentProducts!} />
          )}
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
