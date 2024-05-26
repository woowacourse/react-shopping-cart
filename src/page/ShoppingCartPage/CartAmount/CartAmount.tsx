import * as S from './style';

import OrderSummary, { SummaryItem } from '../../../components/OrderSummary/OrderSummary';
import { checkedItemsState, deliveryFeeState } from '../../../recoil/selectors';

import { InfoIcon } from '../../../assets';
import POLICES from '../../../constants/policies';
import { useRecoilValue } from 'recoil';

export default function OrderAmount() {
  const checkedItems = useRecoilValue(checkedItemsState);
  const orderAmount = checkedItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const items: SummaryItem[] = [
    { description: '주문 금액', price: orderAmount },
    { description: '배송비', price: deliveryFee },
  ];

  return (
    <div>
      <S.DeliveryFeeInfoBox>
        <img src={InfoIcon} />
        {`총 주문 금액이 ${POLICES.amountForFreeShippingLowerBound.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      </S.DeliveryFeeInfoBox>
      <OrderSummary items={items} />
    </div>
  );
}
