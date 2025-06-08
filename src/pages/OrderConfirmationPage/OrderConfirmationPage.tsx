/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import { CartHeader, OrderPriceSummary } from '../../features/cart/ui';
import CartItemInfo from '../../features/cart/ui/CartItemInfo';
import OrderConfirmationText from '../../features/cart/ui/OrderConfirmationText';
import { ROUTES } from '../../shared/constants/routeConstants';
import Navbar from '../../shared/ui/Navbar';
import NavFooter from '../../shared/ui/NavFooter';
import * as S from './OrderConfirmationPage.style';
import Button from '../../shared/ui/Button';
import CouponModal from '../../features/coupon/ui/CouponModal';
import { useModal } from '@sanghee01/modal';
import DeliveryInfo from '../../features/cart/ui/DeliveryInfo';
import { useState } from 'react';

export default function OrderConfirmationPage() {
  const { cartTypeQuantity, SelectedCartItems } = useSelectedCartItemsContext();
  const {
    isOpen: isCouponModalOpen,
    handleOpen: handleOpenCouponModal,
    handleClose: handleCloseCouponModal,
  } = useModal();
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const handleRemoteArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemoteArea(e.target.checked);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.ORDER_SUCCESS);
  };

  return (
    <>
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
          <Button onClick={handleOpenCouponModal} title="쿠폰 적용" css={S.ButtonCSS} />
          <DeliveryInfo onChange={handleRemoteArea} />
          <OrderPriceSummary couponPriceItem={true} />
        </S.OrderConfirmationPageContent>
        <NavFooter title="결제하기" onClick={handleClick} />
      </S.OrderConfirmationPageContainer>
      <CouponModal isOpen={isCouponModalOpen} onClose={handleCloseCouponModal} />
    </>
  );
}
