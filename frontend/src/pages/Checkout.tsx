import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { CatalogContext } from "../context/CatalogContext";

export default function Checkout() {
  const { basket } = useContext(BasketContext);
  const { products } = useContext(CatalogContext);

  const result = basket?.map(obj1 =>
    products?.find(obj2 => obj2.id === obj1.id)
  ).filter(obj => obj !== undefined);;
  
console.log(result);

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
        Your Orders
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
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Size
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }} align="center">
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {myOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {capitalizeFirstLetter(order.sizeName)}
                </TableCell>
                <TableCell align="center">{order.toppings.map((topping) => topping).join(", ")}</TableCell>
                <TableCell align="center">{order.totalPrice} $</TableCell>
                <TableCell align="center">
                  <Button onClick={() => deleteOrder(order.id, order.userName)} variant="contained">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

}
