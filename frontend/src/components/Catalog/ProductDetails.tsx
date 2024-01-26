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
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { BasketContext } from "../../context/BasketContext";
import { toast } from "react-toastify";

const staticFolder: string = "/static";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [buttonDisableFlag, setButtonDisableFlag] = useState(false);
  const [isInBasket, setIsInBasket] = useState(false);
  const { basket, setBasket } = useContext(BasketContext);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  type TypographyVariant = TypographyProps["variant"];
  let variant: TypographyVariant = "h3";

  variant = xs ? "h6" : sm ? "h4" : "h3";

  useEffect(() => {
    let isMounted = true;
    agent.Catalog.getSingleProduct(id!)
      .then((response) => {
        if (isMounted) {
          setSingleProduct(response);
          let initialAvailableQuantity = response.quantityInStock;
          const basketItem = basket?.find((item) => item.id === parseInt(id!));
          if (basketItem) {
            setIsInBasket(true);
            setQuantity(basketItem.selectedQuantity);
            initialAvailableQuantity -= basketItem.selectedQuantity;
          } else {
            setIsInBasket(false);
          }

          setAvailableQuantity(initialAvailableQuantity);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id, basket]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  };

  useEffect(() => {
    if (quantity >= 0) {
      setButtonDisableFlag(false);
    } else {
      setButtonDisableFlag(true);
      toast.error("More Quantity Not Available");
    }
  }, [quantity, availableQuantity]);

  const handleAddToCart = () => {
    const existingItemIndex = basket?.findIndex((item) => item.id === parseInt(id!));
    let updatedBasket;

    if (existingItemIndex !== -1 && existingItemIndex !== undefined && basket) {
      const updatedItem = {
        ...basket[existingItemIndex],
        selectedQuantity: quantity,
      };
      updatedBasket = [...basket.slice(0, existingItemIndex), updatedItem, ...basket.slice(existingItemIndex + 1)];
    } else {
      const newItem = {
        id: parseInt(id!),
        selectedQuantity: quantity,
      };

      updatedBasket = basket ? [...basket, newItem] : [newItem];
    }

    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    // const totalQuantityInBasket = updatedBasket.find((item) => item.id === parseInt(id!))?.selectedQuantity || 0;
    // if (singleProduct?.quantityInStock !== undefined) {
    //   setAvailableQuantity(singleProduct?.quantityInStock);
    // }
  };

  if (loading) {
    return <LoadingComponent message="Loading Selected Product" />;
  }

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
                  <TableCell>{availableQuantity}</TableCell>
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
                InputProps={{ inputProps: { min: 0, max: singleProduct?.quantityInStock } }}
              />
            </Grid>
            <Grid xs={12} item></Grid>
            <Grid xs={12} item textAlign="end">
              <LoadingButton
                disabled={buttonDisableFlag || quantity == (singleProduct?.quantityInStock ?? 0) + 1}
                sx={{ mt: 1, width: "100%" }}
                variant="contained"
                color="success"
                onClick={handleAddToCart}
              >
                {isInBasket ? "Update Cart" : "Add to Cart"}
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
