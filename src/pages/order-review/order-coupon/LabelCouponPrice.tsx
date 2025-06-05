import styled from '@emotion/styled';
import Flex from '../../../components/common/Flex';
import LabelPrice from '../../../components/common/LabelPrice';

import { calculateShippingFee } from '../../../utils/calculateShippingFee';
import { calculateTotalCartItemPrice } from '../../../utils/calculateTotalCartItemPrice';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';

const LabelCouponPrice = () => {
  const { cartListData, selectionMap } = useOrderListContext();
  const selectedItems = (cartListData ?? []).filter(
    (item) => selectionMap[item.id]
  );
  const orderPrice = calculateTotalCartItemPrice(selectedItems);
  const shippingFee = calculateShippingFee(orderPrice);
  const totalPrice = orderPrice + shippingFee;

  return (
    <Container>
      <InfoBox>
        <InfoIcon
          src={`${import.meta.env.BASE_URL}assets/icons/Info.svg`}
          alt='info 아이콘'
        />
        <InfoMessage>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </InfoMessage>
      </InfoBox>
      <PriceWrapper>
        <LabelPrice label='주문 금액' price={orderPrice} />
        <LabelPrice label='쿠폰 할인 금액' price={orderPrice} />
        <LabelPrice label='배송비' price={shippingFee} />
      </PriceWrapper>

      <LabelPrice label='총 결제 금액' price={totalPrice} />
    </Container>
  );
};

export default LabelCouponPrice;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;

const InfoMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const InfoIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const Container = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  height: 180px;
  margin: 24px 0;
`;

const PriceWrapper = styled(Flex)`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 16px 0;
  gap: 16px;
`;
