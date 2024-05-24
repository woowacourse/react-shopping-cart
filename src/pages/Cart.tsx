import {
  StyledFixedBottom,
  StyledFixedTop,
  StyledScrollBox,
} from '@/style/styledBox.style';
import { cartListState, shippingAreaState } from '@/store/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CartList from '@/components/Cart/CartList';
import CartRecipe from '@/components/Cart/CartRecipe';
import CartTitle from '@/components/Cart/CartTitle';
import EmptyCart from '@/components/EmptyCart';
import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header.tsx';
import { ROUTE_PATH } from '@/constants/routePath';
import { orderRecipeState } from '@/store/selectors/orderRecipeSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { orderPrice } = useRecoilValue(orderRecipeState);
  const cartList = useRecoilValue(cartListState);

  const setShippingState = useSetRecoilState(shippingAreaState);
  useEffect(() => {
    setShippingState('normal');
  }, []);

  return (
    <>
      <StyledFixedTop>
        <Header navigatePath={ROUTE_PATH.cart} />
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
                navigate(ROUTE_PATH.order);
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
