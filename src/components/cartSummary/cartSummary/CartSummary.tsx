import { useRecoilValue } from 'recoil';
import {
  deliveryPriceState,
  orderPriceState,
  totalPriceState,
} from '../../../recoil/selector/selector';
import InfoIcon from '../../../assets/InfoIcon.png';
import { CartSummaryItem } from '../cartSummaryItem/CartSummaryItem';
import {
  StyledCartSummaryDetailPrice,
  StyledCartSummaryTotalContainer,
  StyledCartSummaryTotalPrice,
  StyledDeliveryInfo,
  StyledDeliveryInfoImg,
  StyledDeliveryInfoText,
} from './CartSummary.styled';

export const CartSummary: React.FC = () => {
  const orderPrice = useRecoilValue(orderPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);
  const totalPrice = useRecoilValue(totalPriceState);

  return (
    <div>
      <StyledDeliveryInfo>
        <StyledDeliveryInfoImg src={InfoIcon} alt='info' />
        <StyledDeliveryInfoText>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </StyledDeliveryInfoText>
      </StyledDeliveryInfo>

      <StyledCartSummaryTotalContainer>
        <StyledCartSummaryDetailPrice>
          <CartSummaryItem title='주문 금액' price={orderPrice} />
          <CartSummaryItem title='배송비' price={deliveryPrice} />
        </StyledCartSummaryDetailPrice>
        <StyledCartSummaryTotalPrice>
          <CartSummaryItem title='총 결제 금액' price={totalPrice} />
        </StyledCartSummaryTotalPrice>
      </StyledCartSummaryTotalContainer>
    </div>
  );
};
