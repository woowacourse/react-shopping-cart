import Text from '../common/Text/Text';
import { Info } from '../../assets';
import {
  CartPriceContainerStyle,
  CartPriceInfoContainerStyle,
  CartPriceInfoHeaderStyle,
  CartPriceInfoStyle,
} from './CartPriceInfo.styles';

function CartPriceInfo() {
  return (
    <div css={CartPriceInfoContainerStyle}>
      <div css={CartPriceInfoHeaderStyle}>
        <img src={Info} alt="info" />
        <Text varient="caption">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </div>
      <div css={CartPriceContainerStyle}>
        <div css={CartPriceInfoStyle}>
          <Text varient="body">주문 금액</Text>
          <Text varient="title">100,000원</Text>
        </div>
        <div css={CartPriceInfoStyle}>
          <Text varient="body">배송비</Text>
          <Text varient="title">100,000원</Text>
        </div>
      </div>
      <div css={CartPriceContainerStyle}>
        <div css={CartPriceInfoStyle}>
          <Text varient="body">총 결제 금액</Text>
          <Text varient="title">100,000원</Text>
        </div>
      </div>
    </div>
  );
}

export default CartPriceInfo;
