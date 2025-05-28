import { Subtitle, Title } from '../../../styles/@common/title/Title.styles';
import * as S from './CartPrice.styles';
import infoIcon from '/public/icon/ic_info.svg';

interface CartPriceProps {
  cartItemNamePrice: { name: string; price: number }[];
}

const CartPrice = ({ cartItemNamePrice }: CartPriceProps) => {
  const calculateTotalPrice = (
    cartItemNamePrice: { name: string; price: number }[]
  ) => {
    return cartItemNamePrice.reduce((acc, curr) => acc + curr.price, 0);
  };

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
              <div css={Title}>{item.price.toLocaleString()}원</div>
            </div>
          );
        })}
        <div>
          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>배송비</div>
            <div css={Title}>
              {calculateTotalPrice(cartItemNamePrice) > 1000000 ? 0 : 3000}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPrice;
