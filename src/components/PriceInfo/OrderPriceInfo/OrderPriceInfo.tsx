import PriceInfoContainer from '../PriceInfoContainer';
import PriceInfoHeader from '../PriceInfoHeader';
import PriceInfoWrapper from '../PriceInfoWrapper';
import PriceInfoItem from '../PriceInfoItem';

function OrderPriceInfo({
  totalPrice,
  deliveryFee,
  couponDiscount,
}: {
  totalPrice: number;
  deliveryFee: number;
  couponDiscount: number;
}) {
  const finalPriceBeforePayment = totalPrice + deliveryFee - couponDiscount;

  return (
    <PriceInfoContainer>
      <PriceInfoHeader />
      <PriceInfoWrapper>
        <PriceInfoItem label="주문 금액" price={totalPrice} />
        <PriceInfoItem
          label="쿠폰 할인 금액"
          price={couponDiscount > 0 ? -couponDiscount : couponDiscount}
        />
        <PriceInfoItem label="배송비" price={deliveryFee} />
      </PriceInfoWrapper>
      <PriceInfoWrapper>
        <PriceInfoItem label="총 결제 금액" price={finalPriceBeforePayment} />
      </PriceInfoWrapper>
    </PriceInfoContainer>
  );
}

export default OrderPriceInfo;
