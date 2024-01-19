import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {

  return (
    <Card
      sx={{
        height: "100%",
        maxWidth: 345,
        border: "3px solid white",
        marginLeft: "5px",
        marginTop: "15px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={product.pictureUrl} title={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
