import { useRecoilValue } from 'recoil';
import {
  deliveryPriceState,
  orderPriceState,
  totalPriceState,
} from '../../../recoil/selector/selector';
import InfoIcon from '../../../assets/InfoIcon.png';
import {
  StyledSummaryDetailPrice,
  StyledSummaryTotalContainer,
  StyledSummaryTotalPrice,
  StyledDeliveryInfo,
  StyledDeliveryInfoImg,
  StyledDeliveryInfoText,
} from '../Summary.styled';
import { DELIVERY_INFO } from '../../../constants/cart';
import { SummaryItem } from '../summaryItem/SummaryItem';

export const OrderSummary: React.FC = () => {
  const orderPrice = useRecoilValue(orderPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);
  const totalPrice = useRecoilValue(totalPriceState);

  return (
    <div>
      <StyledDeliveryInfo>
        <StyledDeliveryInfoImg src={InfoIcon} alt='info' />
        <StyledDeliveryInfoText>
          {DELIVERY_INFO.FREE_DELIVERY_MESSAGE}
        </StyledDeliveryInfoText>
      </StyledDeliveryInfo>
      <StyledSummaryTotalContainer>
        <StyledSummaryDetailPrice>
          <SummaryItem title='주문 금액' price={orderPrice} />
          <SummaryItem title='쿠폰 할인 금액' price={-1200} />
          <SummaryItem title='배송비' price={deliveryPrice} />
        </StyledSummaryDetailPrice>
        <StyledSummaryTotalPrice>
          <SummaryItem title='총 결제 금액' price={totalPrice} />
        </StyledSummaryTotalPrice>
      </StyledSummaryTotalContainer>
    </div>
  );
};
