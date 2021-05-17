interface Product {
  product_id: string;
  name: string;
  price: number;
  image_url: string;
}

interface CartItem {
  cart_id: string;
  name: string;
  price: number;
  image_url: string;
}

interface Order {
  cart_id: string;
  quantity: number;
}

type OrderList = {
  order_id: string;
  order_details: Product &
    {
      quantity: number;
    }[];
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
