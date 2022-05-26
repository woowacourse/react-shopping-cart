export interface CartType {
  id: string;
  productId: number;
  stock: number;
  isChecked: boolean;
  price: number;
}

export function isCart(cart: CartType | undefined): cart is CartType {
  return (cart as CartType).id !== undefined;
}
