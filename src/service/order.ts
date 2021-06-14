import { CUSTOMER_NAME } from '../appConfig';
import { CartItem, Order, OrderResponse } from '../types';
import customAxios from '../utils/API';

export const registerOrderItemList = (items: CartItem[]) => {
  const APISchema = (items: CartItem[]) =>
    items.map((item) => ({
      cart_id: Number(item.id),
      quantity: item.quantity,
    }));

  customAxios.post(`/api/customers/${CUSTOMER_NAME}/orders`, APISchema(items));
};

export const getOrderItemList = async (): Promise<Order[]> => {
  const { data: orders } = await customAxios.get<OrderResponse[]>(
    `/api/customers/${CUSTOMER_NAME}/orders`
  );

  const appSchema = (orders: OrderResponse[]) =>
    orders.map(({ order_id, order_details }) => ({
      id: order_id,
      items: order_details.map((item) => ({
        id: String(item.product_id),
        name: item.name,
        image: item.image_url,
        price: item.price,
        quantity: item.quantity,
      })),
    }));

  return Promise.resolve(appSchema(orders));
};
