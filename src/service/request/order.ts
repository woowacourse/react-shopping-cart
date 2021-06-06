import axios from 'axios';
import { CUSTOMER_NAME } from '../../constants/API';
import { ItemInCart, Order, OrderItemRequest, OrderResponse } from '../../types';

export const requestOrderItemListToRegister = (items: ItemInCart[]) => {
  // const newOrder: Order = { id: nanoid(), items };
  const newOrders: OrderItemRequest[] = items.map((item) => ({
    cart_id: item.id,
    quantity: item.quantity,
  }));

  axios.post(`/api/customers/${CUSTOMER_NAME}/orders`, newOrders);
};

export const requestOrderItemList = async (): Promise<Order[]> => {
  const { data: orders } = await axios.get<OrderResponse[]>(
    `/api/customers/${CUSTOMER_NAME}/orders`
  );

  //TODO: 추상화할까...?
  const response = orders.map(({ order_id, order_details }) => ({
    id: order_id,
    items: order_details.map((item) => ({
      id: item.product_id,
      name: item.name,
      image: item.image_url,
      price: item.price,
      quantity: item.quantity,
    })),
  }));

  return Promise.resolve(response);
};
