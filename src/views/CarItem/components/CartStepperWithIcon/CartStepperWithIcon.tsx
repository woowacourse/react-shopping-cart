import { useNavigate } from 'react-router-dom';

import * as S from './CartStepperWithIcon.style';

import { useCart, useResetCartList } from '../../../../recoil/cart/cartState';

function CartStepperWithIcon() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const resetCartList = useResetCartList();

  return (
    <S.CartWrapper
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => {
        resetCartList();
        navigate('/cart');
      }}
    >
      <S.CartTitle>
        <S.CartText>장바구니</S.CartText>
      </S.CartTitle>
      <S.CartCountWrapper>
        <S.CartCount aria-live="polite">{cart.length}</S.CartCount>
      </S.CartCountWrapper>
    </S.CartWrapper>
  );
}

export default CartStepperWithIcon;
