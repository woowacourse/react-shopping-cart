type Product = {
  category: "fashion";
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

type CartItemInfo = {
  id: number;
  product: Product;
  quantity: number;
};
