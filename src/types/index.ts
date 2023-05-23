export interface CartItem {
  id: ProductId;
  quantity: number;
  product: Product;
}
export interface Product {
  id: ProductId;
  price: number;
  name: string;
  imageUrl: string;
}

export type ProductId = number;

export const PATH_KEY = ['HOME', 'SHOPPING_BASKET'] as const;

export interface CartItemPostBody {
  productId: ProductId;
}

export interface CartItemPatchBody {
  quantity: number;
}

export interface SelectedProducts {
  id: ProductId;
  price: number;
  checked: boolean;
}
