import {
  StyledFixedBottom,
  StyledFixedTop,
  StyledScrollBox,
} from '@/style/styledBox.style';

import CartRecipe from '@/components/Cart/CartRecipe';
import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header';
import OrderList from '@/components/Order/OrderList';
import OrderTitle from '@/components/Order/OrderTitle';
import ShippingInfo from '@/components/Order/ShippingInfo';
import { WhiteSpace } from '@/style/common.style';
import WideButton from '@/components/Button/WideButton';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  return (
    <>
      <StyledFixedTop>
        <Header />
      </StyledFixedTop>
      <StyledScrollBox>
        <OrderTitle />
        <OrderList />
      </StyledScrollBox>
      <StyledFixedBottom>
        <StyledFlexCenter>
          <WideButton onClick={() => {}} color="white">
            쿠폰 적용
          </WideButton>
        </StyledFlexCenter>
        <ShippingInfo />
        <CartRecipe isCoupon={true} />
        <FullWidthButton
          onClick={() => {
            navigate('/order-confirm');
          }}
        >
          결제하기
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default Order;

const StyledFlexCenter = styled.div`
  display: flex;
  justify-content: center;
  ${WhiteSpace}
`;
