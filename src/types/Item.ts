export interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItems {
  id: number;
  quantity: number;
  product: Item;
}
export interface ItemDetailsStateType {
  quantity: number;
  isChecked: boolean;
}

export interface ItemPriceAndQuantity {
  price: number;
  quantity: number;
}
