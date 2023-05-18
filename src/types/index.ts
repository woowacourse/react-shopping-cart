type ProductId = {
  productId: number;
};

type Quantity = {
  quantity: number;
};

type Product = {
  name: string;
  price: number;
  imageUrl: string;
};

type ProductWithId = Product & {
  id: number;
};

type ProductsWithId = ProductWithId[];

type CartProduct = {
  id: number;
  quantity: number;
  product: ProductWithId;
};

type CartProducts = CartProduct[];

type ProductCardProps = {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
};

type ProductQuantityInputProps = {
  initialValue: number;
  productId: number;
  step?: number;
  notifyFunction?: (value: number) => void;
};

export type {
  ProductId,
  Quantity,
  Product,
  ProductWithId,
  ProductsWithId,
  CartProduct,
  CartProducts,
  ProductCardProps,
  ProductQuantityInputProps,
};
