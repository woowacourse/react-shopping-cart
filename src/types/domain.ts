export interface Item {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  isSelected: boolean;
}
