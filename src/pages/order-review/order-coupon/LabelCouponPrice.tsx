import styled from '@emotion/styled';
import Flex from '../../../components/common/Flex';
import LabelPrice from '../../../components/common/LabelPrice';

import { calculateShippingFee } from '../../../utils/calculateShippingFee';
import { calculateTotalCartItemPrice } from '../../../utils/calculateTotalCartItemPrice';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';
import InfoNotice from '@/components/common/InfoNotice';

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
      <InfoNotice iconSrc={`${import.meta.env.BASE_URL}assets/icons/Info.svg`}>
        총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </InfoNotice>
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
