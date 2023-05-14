import * as S from './CartIconWithCount.style';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

function CartIconWithCount() {
  const navigate = useNavigate();
  const { cartList } = useCart();

  return (
    <S.CartWrapper
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => navigate('/cart')}
    >
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CartCountWrapper>
        <S.CartCount aria-live="polite">{cartList.length}</S.CartCount>
      </S.CartCountWrapper>
    </S.CartWrapper>
  );
}

export default CartIconWithCount;
