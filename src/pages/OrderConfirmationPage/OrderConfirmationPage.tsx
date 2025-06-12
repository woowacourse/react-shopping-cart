/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import { useOrderContext } from '../../features/order/context/useOrderContext';
import { CartHeader } from '../../features/cart/ui';
import CartItemInfo from '../../features/cart/ui/CartItemInfo';
import { OrderConfirmationText, OrderPriceSummary } from '../../features/order/ui';
import { ROUTES } from '../../shared/constants/routeConstants';
import Navbar from '../../shared/ui/Navbar';
import NavFooter from '../../shared/ui/NavFooter';
import * as S from './OrderConfirmationPage.styles';
import Button from '../../shared/ui/Button';
import CouponModal from '../../features/coupon/ui/CouponModal';
import { useModal } from '@sanghee01/modal';
import DeliveryInfo from '../../features/order/ui/DeliveryInfo';

export default function OrderConfirmationPage() {
  const { selectedCartItems } = useSelectedCartItemsContext();
  const { cartTypeQuantity } = useOrderContext();
  const {
    isOpen: isCouponModalOpen,
    handleOpen: handleOpenCouponModal,
    handleClose: handleCloseCouponModal,
  } = useModal();

  const navigate = useNavigate();

  const handleGoOrderSuccessPage = () => {
    navigate(ROUTES.ORDER_SUCCESS);
  };

  return (
    <>
      <S.OrderConfirmationPageContainer>
        <Navbar title="◀" url={ROUTES.ROOT} />
        <S.OrderConfirmationPageContent>
          <CartHeader title="주문 확인" cartTypeQuantity={cartTypeQuantity} content={<OrderConfirmationText />} />
          <S.CartListContainer>
            {selectedCartItems.map((cartItem) => (
              <CartItemInfo
                key={cartItem.id}
                cartItem={cartItem}
                quantityContent={<S.CartItemInfoQuantity>{cartItem.quantity}개</S.CartItemInfoQuantity>}
              />
            ))}
          </S.CartListContainer>
          <Button onClick={handleOpenCouponModal} title="쿠폰 적용" css={S.ButtonCSS} />
          <DeliveryInfo />
          <OrderPriceSummary couponPriceItem={true} />
        </S.OrderConfirmationPageContent>
        <NavFooter title="결제하기" onClick={handleGoOrderSuccessPage} />
      </S.OrderConfirmationPageContainer>
      <CouponModal isOpen={isCouponModalOpen} onClose={handleCloseCouponModal} />
    </>
  );
}
