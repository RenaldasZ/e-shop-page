import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.getSingleProduct(id!)
      .then((response) => setSingleProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <LoadingComponent message="Loading Selected Product" />;
  }

  console.log(singleProduct);

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
