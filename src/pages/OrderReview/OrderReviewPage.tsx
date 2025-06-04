import * as S from './OrderReviewPage.styles';
import { CartHeader, OrderPriceSummary } from '../../features/cart/ui';
import EmptyCartItemUI from '../../features/cart/ui/EmptyCartItemUI';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useCartContext } from '../../shared/context/useCartContext';
import Navbar from '../../shared/ui/Navbar';
import CartPageFooter from '../../features/cart/ui/CartPageFooter';
import ReviewCartList from '../../features/review/ui/ReviewCartList';

export default function OrderReviewPage() {
  const { selectedCartItems } = useCartContext();

  return (
    <S.OrderPageContainer>
      <Navbar title={'◀'} url={ROUTES.ROOT} />
      <S.OrderPageContent>
        <CartHeader cartTypeQuantity={selectedCartItems.length} />
        {selectedCartItems.length > 0 ? (
          <>
            <ReviewCartList />
            <OrderPriceSummary />
          </>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.OrderPageContent>
      <CartPageFooter title='결제하기' url={ROUTES.CONFIRMATION} cartItemQuantity={selectedCartItems.length} />
    </S.OrderPageContainer>
  );
}
