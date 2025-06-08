import useOrderSummary from '../hooks/useOrderSummary';
import OrderList from '../orderList/OrderList';
import OrderPrice from '../orderPrice/OrderPrice';
import OrderTitle from '../orderTitle/OrderTitle';
import * as S from './OrderContents.styles';
import { CouponProvider } from '../../../../global/contexts/CouponContext';
function OrderContents() {
  const order = useOrderSummary();

  return (
    <S.Container>
      <CouponProvider products={order.products}>
        <OrderTitle
          quantity={order.quantity}
          productQuantity={order.productQuantity}
        />
        <OrderList products={order.products} />
        <OrderPrice order={order} />
      </CouponProvider>
    </S.Container>
  );
}

export default OrderContents;
