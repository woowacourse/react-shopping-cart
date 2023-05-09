interface ProductItemData {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItemData {
  id: number;
  quantity: number;
  product: ProductItemData;
}

export type { ProductItemData, CartItemData };
