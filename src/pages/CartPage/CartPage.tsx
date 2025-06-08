import * as S from './CartPage.styles';
import { CartHeader, CartList, OrderPriceSummary } from '../../features/cart/ui';
import Navbar from '../../shared/ui/Navbar';
import CartPageFooter from '../../features/cart/ui/CartPageFooter';
import { useCartItemsContext } from '../../features/cart/context/useCartItemsContext';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import EmptyCartItemUI from '../../features/cart/ui/EmptyCartItemUI';
import { ROUTES } from '../../shared/constants/routeConstants';

function CartPage() {
  const { addAllCartItemsInSelected } = useSelectedCartItemsContext();
  const { cartItems } = useCartItemsContext();

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

      <CartPageFooter cartItemQuantity={cartItems.length} />
    </S.CartPageContainer>
  );
}

export default CartPage;
