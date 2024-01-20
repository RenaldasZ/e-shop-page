import { Product } from "../../models/product";
import ProductCard from "../Card/ProductCard";
import { Grid } from "@mui/material";

interface Props {
  products: Product[] | null;
}

export default function Catalog({ products }: Props) {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        pb: 3,
      }}
    >
      {products?.map((product, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          xl={4}
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.04)",
            },
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
