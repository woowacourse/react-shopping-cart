export interface CartProductList {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface ProductItem {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}
