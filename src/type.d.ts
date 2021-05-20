interface ItemType {
  image_url: string;
  name: string;
  price: number;
}

interface ProductType extends ItemType {
  product_id: string;
}

interface ProductDetailType extends ProductType {
  liked: boolean;
}

interface CartProductType extends ProductType {
  cart_id: string;
}
interface CartProductDetailType extends CartProductType {
  checked: boolean;
  quantity: number;
}

interface OrderDetailType extends ItemType {
  product_id: string;
  quantity: number;
}
interface OrderType {
  order_id: string;
  order_details: Array<OrderDetailType>;
}

export type {
  ItemType,
  ProductType,
  CartProductType,
  OrderType,
  OrderDetailType,
  ProductDetailType,
  CartProductDetailType,
};
