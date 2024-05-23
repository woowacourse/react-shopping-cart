import { PurchaseProcessLayout } from '@components/shoppingCart';
import { useResetCouponRecoil } from '@hooks/coupon';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const OrderPageContents = lazy(() => import('@components/shoppingCart/ShoppingCartContent/ShoppingCartContent'));

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const { resetCouponRecoil } = useResetCouponRecoil();

  const isButtonDisabled = cartItems.length === 0 || selectedIds.length === 0;

  const navigate = useNavigate();

  const handleClickConfirmOderButton = () => {
    navigate(ROUTE_PATHS.orderConfirm);
  };

  useEffect(() => {
    resetCouponRecoil();
  }, []);

  return (
    <PurchaseProcessLayout
      pageTitle="장바구니"
      handleBottomBtnClick={handleClickConfirmOderButton}
      bottomButtonDisable={isButtonDisabled}
      bottomButtonText="주문 확인"
    >
      <OrderPageContents />
    </PurchaseProcessLayout>
  );
};

export default OrderPage;
