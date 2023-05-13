type Required<T> = {
  [P in keyof T]-?: T[P];
};

interface ProductItemData {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItemData {
  id: number;
  quantity: number;
  productId: ProductItemData['id'];
}

export type { Required, ProductItemData, CartItemData };
