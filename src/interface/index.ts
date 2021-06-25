interface Product {
  name: string;
  price: number;
  imageSrc: string;
}

interface ProductsObject {
  [key: string]: Product;
}

interface Id {
  id: string;
}

interface CartItem extends Product, Id {
  quantity: number;
}

interface Cart {
  cart: CartItem[];
}

interface OrderItem extends Product, Id {
  quantity: number;
}

interface Order extends Id {
  itemList: OrderItem[];
}

interface RequestError {
  requestErrorMessage: string | null;
}

interface APIReturnType<T> {
  isSucceeded: boolean;
  message: string;
  result: T;
}

export { Product, ProductsObject, Id, CartItem, Cart, Order, OrderList, RequestError, APIReturnType };
