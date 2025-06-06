import {
  Description,
  Title,
  Subtitle,
} from "../../../styles/@common/title/Title.styles";
import * as S from "./CartPrice.styles";
import infoIcon from "/public/icon/ic_info.svg";
import { FREE_DELIVERY_MESSAGE } from "../../../constants/systemMessages";

interface CartPriceProps {
  orderPrice: number;
  deliveryFee: number;
  discountPrice: number;
  totalPrice: number;
}

const CartPrice = ({
  orderPrice,
  deliveryFee,
  discountPrice,
  totalPrice,
}: CartPriceProps) => {
  return (
    <div css={S.CartPriceWrapper}>
      <div css={S.InfoMessageContainer}>
        <img src={infoIcon} alt="info" />
        <p css={Description}>{FREE_DELIVERY_MESSAGE}</p>
      </div>
      <div css={S.CartPriceDetailContainer}>
        <div>
          <div css={S.CartPriceInfoContainer}>
            <div css={Subtitle}>주문금액</div>
            <div css={Title}>{orderPrice.toLocaleString()}원</div>
          </div>
          <div css={S.CartPriceInfoContainer}>
            <div css={Subtitle}>배송비</div>
            <div css={Title}>{deliveryFee.toLocaleString()}원</div>
          </div>
          <div css={S.CartPriceInfoContainer}>
            <div css={Subtitle}>쿠폰 할인 금액</div>
            <div css={Title}>-{discountPrice.toLocaleString()}원</div>
          </div>
        </div>
      </div>
      <div css={S.CartPriceInfoContainer}>
        <div css={Subtitle}>총 결제 금액</div>
        <div css={Title}>{totalPrice.toLocaleString()}원</div>
      </div>
    </div>
  );
};

export default CartPrice;
