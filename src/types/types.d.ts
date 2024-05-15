interface Product {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
}
