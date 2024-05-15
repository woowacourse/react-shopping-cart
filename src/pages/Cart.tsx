import CartList from '@/components/Cart/CartList';
import CartRecipe from '@/components/Cart/CartRecipe';
import CartTitle from '@/components/Cart/CartTitle';
import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header.tsx';
import { recipeState } from '@/store/selector';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Cart = () => {
  const navigate = useNavigate();
  const { orderPrice } = useRecoilValue(recipeState);

  return (
    <>
      <StyledFixedTop>
        <Header />
      </StyledFixedTop>
      <StyledScrollBox>
        <CartTitle />
        <CartList />
      </StyledScrollBox>
      <StyledFixedBottom>
        <CartRecipe />
        <FullWidthButton
          onClick={() => {
            navigate('/order-confirm');
          }}
          disable={orderPrice === 0 ? true : false}
        >
          주문 확인
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};
export default Cart;

const StyledFixedTop = styled.div`
  width: 430px;
  position: fixed;
  top: 0;
`;

const StyledScrollBox = styled.div`
  margin-top: 64px;
  overflow-y: scroll;
  height: calc(100vh - 230px);
  width: 430px;
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;
