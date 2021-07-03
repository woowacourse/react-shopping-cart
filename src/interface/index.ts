interface Product {
  name: string;
  price: number;
  imageSrc: string;
}

interface ProductsObject {
  [key: string]: Product;
}

interface Id {
  id: number;
}

interface Quantity {
  quantity: number;
}

interface CartItem extends Product, Id, Quantity {}

interface Cart {
  cart: CartItem[];
}

interface OrderItem extends CartItem {}

interface OrderRequest extends Quantity {
  cart_id: number;
}

interface Order extends Id {
  itemList: OrderItem[];
}

interface APIReturnType<T> {
  isSucceeded: boolean;
  message: string;
  result: T;
}

export { Product, ProductsObject, Id, CartItem, Cart, OrderRequest, Order, APIReturnType };
