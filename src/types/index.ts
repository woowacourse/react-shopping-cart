export interface ProductData {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

export interface CartProductData extends ProductData {
  quantity: number;
}
