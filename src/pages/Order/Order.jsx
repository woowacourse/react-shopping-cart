import useGetOrderList from 'hooks/useGetOrderList';

const Order = () => {
  const { getOrderListWhenMounted, orderList } = useGetOrderList();
  getOrderListWhenMounted();

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
