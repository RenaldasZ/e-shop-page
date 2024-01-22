import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../models/product";
import { Link } from "react-router-dom";

// arba veikia su pythonu arba su npm 
const staticFolder: string = '/static/';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card
      sx={{
        height: "95%",
        width: "100%",
        maxWidth: 345,
        border: "3px solid white",
        marginLeft: "5px",
        marginTop: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <CardMedia
        sx={{
          height: 110,
        }}
        // image={staticFolder + product.pictureUrl}
        image={document.URL.includes('3000') ? product.pictureUrl : staticFolder + product.pictureUrl}
        title={product.name}
      />
      <CardContent sx={{ m: "auto" }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {parseFloat(product.price) / 100}€
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {product.productSize}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
        <Button size="small">Add to Cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
