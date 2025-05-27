import { Subtitle, Title } from '../../../styles/@common/title/Title.styles';
import * as S from './CartPrice.styles';
import infoIcon from '/public/icon/ic_info.svg';

const CartPrice = () => {
  return (
    <div css={S.CartPriceWrapper}>
      <div css={S.InfoMessageContainer}>
        <img src={infoIcon} alt="info" />
        <p css={Subtitle}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
      <div css={S.CartPriceDetailContainer}>
        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>CartPrice</div>
          <div css={Title}>CartPrice원</div>
        </div>
        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>CartPrice</div>
          <div css={Title}>CartPrice원</div>
        </div>
      </div>
      <div css={S.CartPriceInfoContainer}>
        <div css={S.CartPriceSubtitle}>CartPrice</div>
        <div css={Title}>CartPrice원</div>
      </div>
    </div>
  );
};

export default CartPrice;
