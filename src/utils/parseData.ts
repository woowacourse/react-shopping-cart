import { CartItem, CartItemData, Order, OrderData, Product, ProductData } from '../type';

export const parseProductData = (productData: ProductData): Product => {
  return {
    id: String(productData.product_id),
    price: String(productData.price),
    name: productData.name,
    thumbnail: productData.image_url,
  };
};

export const parseCartItemData = (cartItemData: CartItemData): CartItem => {
  return {
    id: String(cartItemData.cart_id),
    price: String(cartItemData.price),
    name: cartItemData.name,
    thumbnail: cartItemData.image_url,
    isSelected: true,
    quantity: '1',
  };
};

export const parseOrderData = (orderData: OrderData): Order => {
  const orderItems: Order['orderItems'] = orderData.order_details.map(orderDetail => ({
    id: String(orderDetail.product_id),
    name: orderDetail.name,
    price: String(orderDetail.price),
    thumbnail: orderDetail.image_url,
    quantity: String(orderDetail.quantity),
    isSelected: true,
  }));

  return {
    id: String(orderData.order_id),
    orderItems,
  };
};

export const parseOrderDataList = (orderDataList: OrderData[]): Order[] => {
  return orderDataList.map(parseOrderData);
};
