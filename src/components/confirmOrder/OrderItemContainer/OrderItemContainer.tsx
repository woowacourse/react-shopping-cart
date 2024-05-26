import { useRecoilValue } from 'recoil';
import { checkedCartItemsState, totalCheckedQuantityState } from '../../../recoil/selectors';

import * as Styled from './OrderItemContainer.style';
import OrderItem from '../OrderItem/OrderItem';

export default function OrderItemContainer() {
  const orderItems = useRecoilValue(checkedCartItemsState);
  const totalItemsQuantity = useRecoilValue(totalCheckedQuantityState);

  if (orderItems.length === 0) {
    return <div>주문된 상품 목록이 없습니다.</div>;
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
