import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../models/product";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";
import { toast } from "react-toastify";

// arba veikia su pythonu arba su npm
const staticFolder: string = "/static";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { basket, setBasket, setCount } = useContext(BasketContext);
  const [isProductOutOfStock, setIsProductOutOfStock] = useState(false);

  useEffect(() => {
    const basketItem = basket?.find((item) => item.id === product.id);
    const stockQuantity = product?.quantityInStock ?? 0;
    setIsProductOutOfStock(!!(basketItem && basketItem.selectedQuantity >= stockQuantity));
  }, [product?.quantityInStock, basket, product.id]);

  const addItemToBasket = () => {
    setBasket((prevBasket) => {
      const newBasket = prevBasket ?? [];
      const itemIndex = newBasket.findIndex((item) => item.id === product.id);
      if (itemIndex !== -1) {
        newBasket[itemIndex].selectedQuantity += 1;

        if (newBasket && newBasket[itemIndex]?.selectedQuantity === product.quantityInStock) {
          setIsProductOutOfStock(true);
          toast.error("Out of stock");
        }
      } else {
        newBasket.push({
          id: product.id,
          selectedQuantity: 1,
        });
      }

      localStorage.setItem("basket", JSON.stringify(newBasket));
      const newCount = newBasket.reduce((sum, item) => sum + item.selectedQuantity, 0);
      setCount(newCount);

      return newBasket;
    });
  };

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
        image={document.URL.includes("3000") ? product.pictureUrl : staticFolder + product.pictureUrl}
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
          Price: {product.price / 100}€
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {product.productSize}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
        <Button disabled={isProductOutOfStock} onClick={addItemToBasket} size="small">
          Add to Cart
        </Button>
        <Button onClick={() => {}} component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
