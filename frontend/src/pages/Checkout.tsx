import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { CatalogContext } from "../context/CatalogContext";
import calculateSubtotal from "../utils/calculateSubtotal";
import { Remove, Add, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export default function Checkout() {
  const { basket, setBasket } = useContext(BasketContext);
  const { products } = useContext(CatalogContext);

  const result = basket
    ?.map((obj1) => products?.find((obj2) => obj2.id === obj1.id))
    .filter((obj) => obj !== undefined);

  const handleRemoveQuantity = (index: number) => {
    setBasket((prevBasket) => {
      if (!prevBasket) return prevBasket;

      const newBasket = [...prevBasket];
      const item = newBasket[index];

      if (item) {
        if (item.selectedQuantity > 1) {
          item.selectedQuantity -= 1;
        } else {
          newBasket.splice(index, 1);
        }
      }

      return newBasket;
    });

    localStorage.setItem("basket", JSON.stringify(basket));
  };

  const handleAddQuantity = (id: number | null, index: number) => {
    setBasket((prevBasket) => {
      if (!prevBasket) return prevBasket;

      const newBasket = [...prevBasket];
      const item = newBasket[index];
      let totalQuantity;
      if (products && id != null) {
        totalQuantity = products[id].quantityInStock ?? 0;
      }

      if (item && item.selectedQuantity < totalQuantity!) {
        item.selectedQuantity += 1;
      }

      return newBasket;
    });

    localStorage.setItem("basket", JSON.stringify(basket));
  };

  const totalPrice =
    result?.reduce((total, item, index) => {
      const price = item?.price || 0;
      const quantity = basket![index].selectedQuantity || 0;
      return total + calculateSubtotal(price, quantity);
    }, 0) || 0;

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography
        sx={{
          mt: 3,
          fontSize: {
            xs: "1.5rem",
            sm: "2.5rem",
            md: "3rem",
          },
        }}
        variant="h3"
      >
        Your Basket
      </Typography>
      <TableContainer
        sx={{
          mt: 3,
          maxWidth: "75%",
          overflowX: "auto",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }}>Item #</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Brand
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Size
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Subtotal €
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result?.map((r, index) => {
              const price = r?.price || 0;
              const quantity = basket![index].selectedQuantity || 0;
              return (
                <TableRow key={r!.id}>
                  <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{r?.brand}</TableCell>
                  <TableCell align="center">{r?.type}</TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => handleRemoveQuantity(index)}>
                      <Remove />
                    </Button>
                    {quantity}
                    <Button onClick={() => handleAddQuantity(r?.id ?? null, index)}>
                      <Add />
                    </Button>
                  </TableCell>

                  <TableCell align="center">{r?.productSize}</TableCell>
                  <TableCell align="center">{calculateSubtotal(price, quantity)}</TableCell>
                  <TableCell align="right">
                    <LoadingButton color="error">
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ width: "75%", mt: 2 }} display="flex" justifyContent="flex-end">
        <Typography fontWeight="bolder" component={Paper} sx={{ p: 2, alignSelf: "end" }}>
          Total: {totalPrice}€
        </Typography>
      </Box>
      <Box sx={{ width: "75%", mt: 4, gap: 3 }} display="flex" justifyContent="flex-end">
        <Button component={Link} to="/" variant="contained">
          Back To Catalog
        </Button>
        <Button color="success" variant="contained">
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
