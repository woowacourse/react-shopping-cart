export interface Product {
  name: string;
  price: string;
  imgSrc: string;
}

export interface ShoppingCartItem extends Product {
  amount: number;
}
