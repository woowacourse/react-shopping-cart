import { PurchaseProcessLayout } from '@components/shoppingCart';
import { useAvailableCoupons } from '@hooks/coupon';
import { availableCouponsAtom, cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPageContents = lazy(() => import('@components/shoppingCart/ShoppingCartContent/ShoppingCartContent'));

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const isButtonDisabled = cartItems.length === 0 || selectedIds.length === 0;

  const navigate = useNavigate();

  const handleClickConfirmOderButton = () => {
    navigate(ROUTE_PATHS.confirm);
  };

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
