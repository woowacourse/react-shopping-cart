import useGetOrderList from 'hooks/useGetOrderList';
import { useEffect } from 'react';

const Order = () => {
  const { getOrderList, orderList } = useGetOrderList();

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div>
      OrderList
      {orderList.map((order) => {
        return (
          <div key={order.id}>
            {order.name} /{order.cartQuantity}개 / 개당 {order.cartQuantity}원 /
            {order.price * order.cartQuantity}원 / {order.imgUrl}
          </div>
        );
      })}
    </div>
  );
};

export default Order;
