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

interface Id {
  id: string;
}

interface CartItem extends Id {
  quantity: number;
  isSelected: boolean;
}

interface Cart {
  cart: CartItem[];
}

interface OrderItem extends Id {
  quantity: number;
}

interface Order extends Id {
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
  Id,
  CartItem,
  Cart,
  Order,
  OrderList,
  RequestError,
};
