interface Product {
  name: string;
  price: number;
  imageSrc: string;
}

interface ProductsObject {
  products: {
    [key: string]: Product;
  };
}

interface CartItem {
  id: string;
  quantity: number;
  isSelected: boolean;
}

interface Cart {
  cart: CartItem[];
}

interface OrderItem {
  id: string;
  quantity: number;
}

interface Order {
  id: string;
  itemList: OrderItem[];
}

interface OrderList {
  orderList: Order[];
}

interface RequestError {
  requestErrorMessage: string | null;
}

export {
  Product,
  ProductsObject,
  CartItem,
  Cart,
  Order,
  OrderList,
  RequestError,
};
