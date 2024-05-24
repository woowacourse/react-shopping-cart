import { useRecoilValue } from 'recoil';
import { totalCheckedCartItemsState, totalCheckedQuantityState } from '../../../recoil/selectors';

import * as Styled from './OrderItemContainer.style';
import OrderItem from '../OrderItem/OrderItem';

export default function ConfirmOrderContainer() {
  const orderItems = useRecoilValue(totalCheckedCartItemsState);
  const totalItemsQuantity = useRecoilValue(totalCheckedQuantityState);

  if (orderItems.length === 0) {
    return <div>장바구니에 담은 상품이 없습니다.</div>;
  }

  return (
    <>
      <Styled.Description>
        {`총 ${orderItems.length}종류의 상품 ${totalItemsQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
      </Styled.Description>

      <ul>
        {orderItems.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </ul>
    </>
  );
}
