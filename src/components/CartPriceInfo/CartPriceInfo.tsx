import Text from '../common/Text/Text';
import {
  CartPriceContainerStyle,
  CartPriceInfoContainerStyle,
  CartPriceInfoStyle,
} from './CartPriceInfo.styles';
import { CART } from '../../constants/cart';
import { TEXT } from '../../constants/text';
import InfoMessage from '../InfoMessage/InfoMessage';

function CartPriceInfo({ totalPrice }: { totalPrice: number }) {
  const deliveryFee =
    totalPrice >= CART.FREE_DELIVERY_THRESHOLD ? 0 : CART.DELIVERY_FEE;
  const totalPriceWithDeliveryFee = totalPrice + deliveryFee;

  return (
    <div css={CartPriceInfoContainerStyle}>
      <InfoMessage
        message={`총 주문 금액이 ${CART.FREE_DELIVERY_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <div css={CartPriceContainerStyle}>
        <div css={CartPriceInfoStyle}>
          <Text varient="body">{TEXT.ORDER_PRICE}</Text>
          <Text varient="title">{totalPrice.toLocaleString()}원</Text>
        </div>
        <div css={CartPriceInfoStyle}>
          <Text varient="body">{TEXT.DELIVERY_FEE}</Text>
          <Text varient="title">{deliveryFee.toLocaleString()}원</Text>
        </div>
      </div>
      <div css={CartPriceContainerStyle}>
        <div css={CartPriceInfoStyle}>
          <Text varient="body">{TEXT.TOTAL_PRICE}</Text>
          <Text varient="title">
            {totalPriceWithDeliveryFee.toLocaleString()}원
          </Text>
        </div>
      </div>
    </div>
  );
}

export default CartPriceInfo;
