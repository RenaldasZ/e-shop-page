import { Product } from "../../models/product";
import ProductCard from "../Card/ProductCard";
import { Grid } from "@mui/material";

interface Props {
  products: Product[];
}

export default function Catalog({ products }: Props) {
  return (
    <Grid
      container
      spacing={4}
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "stretch", pb: 3 }}
    >
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={6} xl={4} key={index}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
