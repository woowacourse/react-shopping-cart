import { useNavigate } from 'react-router';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import { CartHeader, OrderPriceSummary } from '../../features/cart/ui';
import CartItemInfo from '../../features/cart/ui/CartItemInfo';
import OrderConfirmationText from '../../features/cart/ui/OrderConfirmationText';
import { ROUTES } from '../../shared/constants/routeConstants';
import Navbar from '../../shared/ui/Navbar';
import NavFooter from '../../shared/ui/NavFooter';
import * as S from './OrderConfirmationPage.style';

export default function OrderConfirmationPage() {
  const { cartTypeQuantity, SelectedCartItems } = useSelectedCartItemsContext();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.ORDER_SUCCESS);
  };

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
        <OrderPriceSummary couponPriceItem={true} />
      </S.OrderConfirmationPageContent>
      <NavFooter title="결제하기" onClick={handleClick} />
    </S.OrderConfirmationPageContainer>
  );
}
