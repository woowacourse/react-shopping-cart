/** @jsxImportSource @emotion/react */

import * as S from './OrderReviewPage.styles';
import { CartHeader, OrderPriceSummary } from '../../features/cart/ui';
import EmptyCartItemUI from '../../features/cart/ui/EmptyCartItemUI';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useCartContext } from '../../shared/context/useCartContext';
import Navbar from '../../shared/ui/Navbar';
import CartPageFooter from '../../features/cart/ui/CartPageFooter';
import ReviewCartList from '../../features/review/ui/ReviewCartList';
import Button from '../../shared/ui/Button';
import { css } from '@emotion/react';
import { useState } from 'react';
import CustomModal from '../../shared/ui/CustomModal';
import CouponList from '../../features/coupon/ui/CouponList';

const CouponButtonCSS = css`
  width: 100%;
  padding: 12px 0;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  margin: 30px 0;

  transition: background-color 0.2s ease;
  &:hover {
    background-color: #e7e7e7;
  }
`;

export default function OrderReviewPage() {
  const { selectedCartItems } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.OrderPageContainer>
      <Navbar title={'◀'} url={ROUTES.ROOT} />
      <S.OrderPageContent>
        <CartHeader cartTypeQuantity={selectedCartItems.length} />
        {selectedCartItems.length > 0 ? (
          <>
            <ReviewCartList />
            <Button onClick={() => setIsModalOpen(!isModalOpen)} title='쿠폰 적용' css={CouponButtonCSS} />
            <OrderPriceSummary useCoupon={true} />
          </>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.OrderPageContent>
      <CartPageFooter title='결제하기' url={ROUTES.CONFIRMATION} cartItemQuantity={selectedCartItems.length} />
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} position='center'>
          <CouponList onClose={() => setIsModalOpen(false)} />
        </CustomModal>
      )}
    </S.OrderPageContainer>
  );
}
