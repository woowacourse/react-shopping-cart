interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Cart {
  id: number;
  quantity: number;
  product: Product;
}

interface Price {
  totalOrderPrice: number;
  deliveryFee: number;
  totalPrice: number;
}

interface PriceList {
  [key: number]: [string, number];
}
