export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  pictureUrl: string;
  type?: string;
  brand: string;
  quantityInStock?: number;
  productSize: string;
}
