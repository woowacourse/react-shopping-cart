import {
  StyledFixedBottom,
  StyledFixedTop,
  StyledScrollBox,
} from '@/style/styledBox.style';

import CartList from '@/components/Cart/CartList';
import CartRecipe from '@/components/Cart/CartRecipe';
import CartTitle from '@/components/Cart/CartTitle';
import EmptyCart from '@/components/EmptyCart';
import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header.tsx';
import { cartListState } from '@/store/atoms';
import { recipeState } from '@/store/selectors/recipeSelector';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Cart = () => {
  const navigate = useNavigate();
  const { orderPrice } = useRecoilValue(recipeState);

  const cartList = useRecoilValue(cartListState);

  return (
    <>
      <StyledFixedTop>
        <Header />
      </StyledFixedTop>
      {cartList.length ? (
        <>
          <StyledScrollBox>
            <CartTitle />
            <CartList />
          </StyledScrollBox>
          <StyledFixedBottom>
            <CartRecipe />
            <FullWidthButton
              onClick={() => {
                navigate('/order');
              }}
              disable={orderPrice === 0 ? true : false}
            >
              주문 확인
            </FullWidthButton>
          </StyledFixedBottom>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
export default Cart;
