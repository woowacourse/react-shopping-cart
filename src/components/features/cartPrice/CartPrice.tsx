import { Subtitle, Title } from '../../../styles/@common/title/Title.styles';
import {
  calculateTotalCartItemPrice,
  calculateTotalPrice,
} from '../../../utils/calculate';
import * as S from './CartPrice.styles';
import infoIcon from '/public/icon/ic_info.svg';

interface CartPriceProps {
  cartItemNamePrice: { name: string; price: number; quantity: number }[];
}

const CartPrice = ({ cartItemNamePrice }: CartPriceProps) => {
  return (
    <div css={S.CartPriceWrapper}>
      <div css={S.InfoMessageContainer}>
        <img src={infoIcon} alt="info" />
        <p css={Subtitle}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
      <div css={S.CartPriceDetailContainer}>
        {cartItemNamePrice.map((item) => {
          return (
            <div css={S.CartPriceInfoContainer}>
              <div css={S.CartPriceSubtitle}>{item.name}</div>
              <div css={Title}>
                {(item.price * item.quantity).toLocaleString()}원
              </div>
            </div>
          );
        })}
        <div>
          {calculateTotalCartItemPrice(cartItemNamePrice) !== 0 && (
            <div css={S.CartPriceInfoContainer}>
              <div css={S.CartPriceSubtitle}>배송비</div>
              <div css={Title}>
                {calculateTotalCartItemPrice(cartItemNamePrice) > 100000
                  ? 0
                  : (3000).toLocaleString()}
                원
              </div>
            </div>
          )}
        </div>
      </div>
      <div css={S.CartPriceInfoContainer}>
        <div css={S.CartPriceSubtitle}>총 주문 금액</div>
        {calculateTotalCartItemPrice(cartItemNamePrice) !== 0 && (
          <div css={Title}>
            {calculateTotalPrice(cartItemNamePrice).toLocaleString()}원
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPrice;
