import {
  CartPriceContainerStyle,
  CartPriceInfoContainerStyle,
} from './CartPriceInfo.styles';
import { CART } from '../../constants/cart';
import { TEXT } from '../../constants/text';
import InfoMessage from '../InfoMessage/InfoMessage';
import CartPriceInfoRow from '../PriceInfoRow/CartPriceInfoRow';

function CartPriceCouponInfo({
  subTotal,
  totalDiscount,
  deliveryFee,
  finalPrice,
}: {
  subTotal: number;
  totalDiscount: number;
  deliveryFee: number;
  finalPrice: number;
}) {
  return (
    <div css={CartPriceInfoContainerStyle}>
      <InfoMessage
        message={`총 주문 금액이 ${CART.FREE_DELIVERY_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <div css={CartPriceContainerStyle}>
        <CartPriceInfoRow title={TEXT.ORDER_PRICE} price={subTotal} />
        <CartPriceInfoRow title={TEXT.COUPON_PRICE} price={totalDiscount} />
        <CartPriceInfoRow title={TEXT.DELIVERY_FEE} price={deliveryFee} />
        <CartPriceInfoRow title={TEXT.TOTAL_PRICE} price={finalPrice} />
      </div>
      <div css={CartPriceContainerStyle}>
        <CartPriceInfoRow title={TEXT.TOTAL_PRICE} price={finalPrice} />
      </div>
    </div>
  );
}

export default CartPriceCouponInfo;
