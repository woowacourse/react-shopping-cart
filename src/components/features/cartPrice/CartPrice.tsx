import { Subtitle, Title } from '../../../styles/@common/title/Title.styles';
import {
  calculateTotalCartItemPrice,
  calculateTotalPrice,
} from '../../../utils/calculate';
import * as S from './CartPrice.styles';
import infoIcon from '/public/icon/ic_info.svg';
import { FREE_DELIVERY_MESSAGE } from '../../../constants/systemMessages';
import { FEE } from '../../../constants/systemConstants';
interface CartPriceProps {
  cartItemNamePrice: { name: string; price: number; quantity: number }[];
}

const CartPrice = ({ cartItemNamePrice }: CartPriceProps) => {
  const totalCartItemPrice = calculateTotalCartItemPrice(cartItemNamePrice);
  const totalPrice = calculateTotalPrice(cartItemNamePrice);

  return (
    <div css={S.CartPriceWrapper}>
      <div css={S.InfoMessageContainer}>
        <img src={infoIcon} alt="info" />
        <p css={Subtitle}>{FREE_DELIVERY_MESSAGE}</p>
      </div>
      <div css={S.CartPriceDetailContainer}>
        {cartItemNamePrice.map((item) => {
          return (
            <div key={item.name} css={S.CartPriceInfoContainer}>
              <div css={S.CartPriceSubtitle}>{item.name}</div>
              <div css={Title}>
                {(item.price * item.quantity).toLocaleString()}원
              </div>
            </div>
          );
        })}
        <div>
          {totalCartItemPrice !== FEE.DELIVERY_FEE_FREE && (
            <div css={S.CartPriceInfoContainer}>
              <div css={S.CartPriceSubtitle}>배송비</div>
              <div css={Title}>
                {totalCartItemPrice > FEE.DELIVERY_FEE_STANDARD
                  ? FEE.DELIVERY_FEE_FREE
                  : FEE.DELIVERY_FEE.toLocaleString()}
                원
              </div>
            </div>
          )}
        </div>
      </div>
      <div css={S.CartPriceInfoContainer}>
        <div css={S.CartPriceSubtitle}>총 주문 금액</div>
        {totalCartItemPrice !== 0 && (
          <div css={Title}>{totalPrice.toLocaleString()}원</div>
        )}
      </div>
    </div>
  );
};

export default CartPrice;
