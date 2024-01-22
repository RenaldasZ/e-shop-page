import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { LoadingButton } from "@mui/lab";

const staticFolder: string = "/static";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  type TypographyVariant = TypographyProps["variant"];
  let variant: TypographyVariant = "h3";

  variant = xs ? "h6" : sm ? "h4" : "h3";

  useEffect(() => {
    agent.Catalog.getSingleProduct(id!)
      .then((response) => setSingleProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  if (loading) {
    return <LoadingComponent message="Loading Selected Product" />;
  }

  console.log(singleProduct);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img
            src={document.URL.includes("3000") ? singleProduct?.pictureUrl : staticFolder + singleProduct?.pictureUrl}
            alt={singleProduct?.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography mb={2} variant={variant}>
            {singleProduct?.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary" mb={3}>
            {(singleProduct?.price ?? 0) / 100} €
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell>{singleProduct?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell>{singleProduct?.description}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell>{singleProduct?.type}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
                  <TableCell>{singleProduct?.brand}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Quanity in Stock</TableCell>
                  <TableCell>{singleProduct?.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container>
            <Grid item xs={12}>
              <TextField
                sx={{ mt: 2, mb: 2 }}
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                label="Quantity in Cart"
                fullWidth
                value={quantity}
              />
            </Grid>
            <Grid xs={12} item></Grid>
            <Grid xs={12} item textAlign="end">
              <LoadingButton sx={{ mt: 1, width: "100%" }} variant="contained" color="success">
                Add To Cart
              </LoadingButton>
              <Button
                sx={{ mb: 2, mt: 1, width: "100%" }}
                variant="contained"
                component={Link}
                to="/"
                color="secondary"
              >
                Back To Catalog
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
