export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: string;
}

export interface ProductListType extends Array<ProductType> {}
