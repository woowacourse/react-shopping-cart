/** @jsxImportSource @emotion/react */

import * as S from './OrderReviewPage.styles';
import { CartHeader, CartPageFooter, EmptyCartItemUI } from '../../features/cart/ui';
import { ROUTES } from '../../shared/constants/routeConstants';
import Navbar from '../../shared/ui/Navbar';
import ReviewCartList from '../../features/review/ui/ReviewCartList';
import Button from '../../shared/ui/Button';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import CustomModal from '../../shared/ui/CustomModal';
import CouponList from '../../features/coupon/ui/CouponList';
import { getSelectedCartItemsFromLocalStorage } from '../../features/cart/utils/localStorageService';
import { CartItem } from '../../features/cart/api/types/cart';
import { OrderPriceSummary } from '../../widgets/ui';

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
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSelectedCartItems(getSelectedCartItemsFromLocalStorage());
  }, []);

  return (
    <S.OrderPageContainer>
      <Navbar title={'◀'} url={ROUTES.ROOT} />
      <S.OrderPageContent>
        <CartHeader cartTypeQuantity={selectedCartItems.length} />
        {selectedCartItems.length > 0 ? (
          <>
            <ReviewCartList selectedCartItems={selectedCartItems} />
            <Button onClick={() => setIsModalOpen(!isModalOpen)} title='쿠폰 적용' css={CouponButtonCSS} />
            <OrderPriceSummary useCoupon={true} />
          </>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.OrderPageContent>
      <CartPageFooter
        title='결제하기'
        url={ROUTES.CONFIRMATION}
        cartItemQuantity={selectedCartItems.length}
        selectedCartItems={selectedCartItems}
      />
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} position='center'>
          <CouponList onClose={() => setIsModalOpen(false)} />
        </CustomModal>
      )}
    </S.OrderPageContainer>
  );
}
