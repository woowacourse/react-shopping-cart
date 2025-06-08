import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import { CartHeader, OrderPriceSummary } from '../../features/cart/ui';
import CartItemInfo from '../../features/cart/ui/CartItemInfo';
import OrderConfirmationText from '../../features/cart/ui/OrderConfirmationText';
import { ROUTES } from '../../shared/constants/routeConstants';
import Navbar from '../../shared/ui/Navbar';
import * as S from './OrderConfirmationPage.style';

export default function OrderConfirmationPage() {
  const { cartTypeQuantity, SelectedCartItems } = useSelectedCartItemsContext();

  return (
    <S.OrderConfirmationPageContainer>
      <Navbar title="◀" url={ROUTES.ROOT} />
      <S.OrderConfirmationPageContent>
        <CartHeader title="주문 확인" cartTypeQuantity={cartTypeQuantity} content={<OrderConfirmationText />} />
        <S.CartListContainer>
          {SelectedCartItems.map((cartItem) => (
            <CartItemInfo
              key={cartItem.id}
              cartItem={cartItem}
              quantityContent={<S.CartItemInfoQuantity>{cartItem.quantity}개</S.CartItemInfoQuantity>}
            />
          ))}
        </S.CartListContainer>
        <OrderPriceSummary />
      </S.OrderConfirmationPageContent>
    </S.OrderConfirmationPageContainer>
  );
}
