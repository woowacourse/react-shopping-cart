import PriceInfoContainer from '../PriceInfoContainer';
import PriceInfoHeader from '../PriceInfoHeader';
import PriceInfoWrapper from '../PriceInfoWrapper';
import PriceInfoItem from '../PriceInfoItem';

function CartPriceInfo({ totalPrice }: { totalPrice: number }) {
  const deliveryFee = totalPrice >= 100000 ? 0 : 3000;
  const totalPriceWithDeliveryFee = totalPrice + deliveryFee;

  return (
    <PriceInfoContainer>
      <PriceInfoHeader />
      <PriceInfoWrapper>
        <PriceInfoItem label="주문 금액" price={totalPrice} />
        <PriceInfoItem label="배송비" price={deliveryFee} />
      </PriceInfoWrapper>
      <PriceInfoWrapper>
        <PriceInfoItem label="총 결제 금액" price={totalPriceWithDeliveryFee} />
      </PriceInfoWrapper>
    </PriceInfoContainer>
  );
}

export default CartPriceInfo;
