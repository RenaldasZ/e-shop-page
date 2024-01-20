import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <div>
      This is Product Details Page for product {id} press{" "}
      <Button variant="contained" component={Link} to="/">
        Home
      </Button>{" "}
      to go back
    </div>
  );
}
