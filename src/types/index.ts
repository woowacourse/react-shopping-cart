interface Product {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}
interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}

type Order = {
  cartId: string;
  quantity: number;
}[];

type OrderList = {
  orderId: string;
  order_details: (Product & {
    quantity: number;
  })[];
}[];

interface RequestError {
  requestErrorMessage: string | null;
}

interface Loading {
  loading: boolean;
}

interface Animation {
  animation: {
    isShow: boolean;
  };
}

export { Product, CartItem, Order, OrderList, RequestError, Loading, Animation };
