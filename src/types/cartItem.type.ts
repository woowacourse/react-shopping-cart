export type ResponseCartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type CartItem = {
  cartItemId: number; // product.id와 id가 혼돌될 여지가 있어 프로퍼티명 수정
  quantity: number;
  product: Product;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};
