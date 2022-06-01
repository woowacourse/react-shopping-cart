export interface ProductType {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  stock: number;
  isInShoppingCart: boolean;
}

export function isProduct(product: ProductType | {}): product is ProductType {
  return (product as ProductType).id !== undefined;
}
