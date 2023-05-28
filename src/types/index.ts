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

interface PostCartItemRequestBody {
  productId: number;
  quantity: number;
}

export type { ProductItemData, CartItemData, PostCartItemRequestBody };
