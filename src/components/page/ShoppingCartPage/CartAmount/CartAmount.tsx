import OrderSummary, { SummaryItem } from '../../../common/OrderSummary/OrderSummary';
import { checkedItemsState, deliveryFeeState } from '../../../../recoil/selectors';

import InfoParagraph from '../../../common/InfoParagraph/InfoParagraph';
import POLICES from '../../../../constants/policies';
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
    <>
      <InfoParagraph>{`총 주문 금액이 ${POLICES.amountForFreeShippingLowerBound.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}</InfoParagraph>
      <OrderSummary items={items} />
    </>
  );
}
