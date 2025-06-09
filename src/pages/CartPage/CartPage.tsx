import * as S from './CartPage.styles';
import { CartHeader, CartList } from '../../features/cart/ui';
import { OrderPriceSummary } from '../../features/order/ui';
import Navbar from '../../shared/ui/Navbar';
import { useCartItemsContext } from '../../features/cart/context/useCartItemsContext';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import EmptyCartItemUI from '../../features/cart/ui/EmptyCartItemUI';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useNavigate } from 'react-router';
import NavFooter from '../../shared/ui/NavFooter';

function CartPage() {
  const { addAllCartItemsInSelected, SelectedCartItems } = useSelectedCartItemsContext();
  const { cartItems } = useCartItemsContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.ORDER_CONFIRMATION);
  };

  return (
    <S.CartPageContainer>
      <Navbar title={'SHOP'} url={ROUTES.ROOT} />
      <S.CartPageContent>
        <CartHeader
          title="장바구니"
          cartTypeQuantity={cartItems.length}
          content={`현재 ${cartItems.length}개의 상품이 담겨있습니다.`}
        />
        {cartItems.length > 0 ? (
          <>
            <CartList addAllCartItemsInSelected={addAllCartItemsInSelected} />
            <OrderPriceSummary />
          </>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.CartPageContent>

      <NavFooter
        title="주문 확인"
        isDisabled={cartItems.length === 0 || SelectedCartItems.length === 0}
        onClick={handleClick}
      />
    </S.CartPageContainer>
  );
}

export default CartPage;
