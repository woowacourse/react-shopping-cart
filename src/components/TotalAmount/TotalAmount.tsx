import styled from 'styled-components';
import { NotificationIcon } from '../../asset';
import { MESSAGES } from '../../constants/Messages';

const TotalAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6rem;
`;

const NotificationIconImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const InformationMsg = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.4rem;
`;

const TotalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Border = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const TotalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TotalInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalInfoLabel = styled.p`
  font-size: 1.6rem;
  line-height: 1.6rem;
`;

const TotalInfoAmount = styled.p`
  font-size: 2.4rem;
  line-height: 3.475rem;
  text-align: right;
`;

interface DiscountProps {
  type: 'discount';
  price: {
    totalAmount: number;
    totalDiscount: number | undefined;
    deliveryFee: number;
    calculatedTotalAmount: number;
  };
}

interface NoDiscountProps {
  type: 'noneDiscount';
  price: {
    totalAmount: number;
    deliveryFee: number;
    calculatedTotalAmount: number;
  };
}

type ToTalAmountProps = DiscountProps | NoDiscountProps;

function TotalAmount({ price, type }: ToTalAmountProps) {
  return (
    <TotalAmountContainer>
      <InformationMsg>
        <NotificationIconImg src={NotificationIcon} alt="Notification Icon" />
        {MESSAGES.cartNotification}
      </InformationMsg>
      <TotalContent>
        <Border />

        <TotalInfoWrapper>
          <TotalInfoBox>
            <TotalInfoLabel>{MESSAGES.totalInfoLabel}</TotalInfoLabel>
            <TotalInfoAmount>
              {price.totalAmount.toLocaleString()}원
            </TotalInfoAmount>
          </TotalInfoBox>

          {type === 'discount' && (
            <TotalInfoBox>
              <TotalInfoLabel>{MESSAGES.totalDiscountLabel}</TotalInfoLabel>
              <TotalInfoAmount>
                {price.totalDiscount?.toLocaleString()}원
              </TotalInfoAmount>
            </TotalInfoBox>
          )}

          <TotalInfoBox>
            <TotalInfoLabel>{MESSAGES.deliveryFee}</TotalInfoLabel>
            <TotalInfoAmount>
              {price.deliveryFee.toLocaleString()}원
            </TotalInfoAmount>
          </TotalInfoBox>
        </TotalInfoWrapper>

        <Border />
      </TotalContent>
      <TotalInfoBox>
        <TotalInfoLabel>{MESSAGES.totalAmountLabel}</TotalInfoLabel>
        <TotalInfoAmount>
          {price.calculatedTotalAmount.toLocaleString()}원
        </TotalInfoAmount>
      </TotalInfoBox>
    </TotalAmountContainer>
  );
}

export default TotalAmount;
