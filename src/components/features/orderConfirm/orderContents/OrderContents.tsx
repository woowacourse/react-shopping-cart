import { CouponProvider } from '../contexts/CouponContext';
import useOrderSummary from '../hooks/useOrderSummary';
import OrderList from '../orderList/OrderList';
import OrderPrice from '../orderPrice/OrderPrice';
import OrderTitle from '../orderTitle/OrderTitle';
import * as S from './OrderContents.styles';
function OrderContents() {
  const order = useOrderSummary();

  return (
    <S.Container>
      <CouponProvider products={order.products}>
        <OrderTitle
          uniqueProductCount={order.uniqueProductCount}
          productQuantity={order.productQuantity}
        />
        <OrderList products={order.products} />
        <OrderPrice order={order} />
      </CouponProvider>
    </S.Container>
  );
}

export default OrderContents;
