import { Subtitle, Title } from "../../../styles/@common/title/Title.styles";
import * as S from "./CartPrice.styles";
import infoIcon from "/public/icon/ic_info.svg";
import { FREE_DELIVERY_MESSAGE } from "../../../constants/systemMessages";
interface CartPriceProps {
  orderPrice: number;
  deliveryFee: number;
  totalPrice: number;
}

const CartPrice = ({ orderPrice, deliveryFee, totalPrice }: CartPriceProps) => {
  return (
    <div css={S.CartPriceWrapper}>
      <div css={S.InfoMessageContainer}>
        <img src={infoIcon} alt="info" />
        <p css={Subtitle}>{FREE_DELIVERY_MESSAGE}</p>
      </div>
      <div css={S.CartPriceDetailContainer}>
        <div>
          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>주문금액</div>
            <div css={Title}>{orderPrice.toLocaleString()}원</div>
          </div>
          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>배송비</div>
            <div css={Title}>{deliveryFee.toLocaleString()}원</div>
          </div>
        </div>
      </div>
      <div css={S.CartPriceInfoContainer}>
        <div css={S.CartPriceSubtitle}>총 결제 금액</div>
        <div css={Title}>{totalPrice.toLocaleString()}원</div>
      </div>
    </div>
  );
};

export default CartPrice;
