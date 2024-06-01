export interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Items {
  id: number;
  quantity: number;
  product: Item;
}

export interface ItemDetailsStateType {
  quantity: number;
  price: number;
  isChecked: boolean;
}