import OrderSummary, { SummaryItem } from '../../../common/OrderSummary/OrderSummary';
import {
  checkedItemsState,
  couponAmountState,
  deliveryFeeState,
} from '../../../../recoil/selectors';

import InfoParagraph from '../../../../components/common/InfoParagraph/InfoParagraph';
import POLICES from '../../../../constants/policies';
import { useRecoilValue } from 'recoil';

export default function CartAmountWithCoupon() {
  const checkedItems = useRecoilValue(checkedItemsState);
  const orderAmount = checkedItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );
  const couponAmount = useRecoilValue(couponAmountState);
  const deliveryFee = useRecoilValue(deliveryFeeState);

  const items: SummaryItem[] = [
    { description: '주문 금액', price: orderAmount },
    { description: '쿠폰 할인 금액', price: -couponAmount },
    { description: '배송비', price: deliveryFee },
  ];
  return (
    <>
      <InfoParagraph>{`총 주문 금액이 ${POLICES.amountForFreeShippingLowerBound.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}</InfoParagraph>
      <OrderSummary items={items} />
    </>
  );
}
