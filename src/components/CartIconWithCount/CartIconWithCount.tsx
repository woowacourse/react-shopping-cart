import { useNavigate } from 'react-router-dom';

import * as S from './CartIconWithCount.style';
import { useCartListLength } from '../../hooks/cartListState/cartListState';

function CartIconWithCount() {
  const navigate = useNavigate();
  const cartListLength = useCartListLength();

  return (
    <S.CartWrapper
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => navigate('/cart')}
    >
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CartCountWrapper>
        <S.CartCount aria-live="polite">{cartListLength}</S.CartCount>
      </S.CartCountWrapper>
    </S.CartWrapper>
  );
}

export default CartIconWithCount;
