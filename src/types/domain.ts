export interface ItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: string;
}

export interface ItemListType extends Array<ItemType> {}
