declare module '*.png';

export type CartItemProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export interface FormattedProduct extends CartItemProduct {
  isChecked: boolean;
}

export type CartItemData = {
  id: number;
  quantity: number;
  product: ProductType;
};

export type Variant = 'header' | 'footer' | 'image';
