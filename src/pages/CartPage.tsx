import { Suspense } from 'react';

import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Header from '../components/Header/Header';
import Button from '../components/common/Button/Button';
import useCartItemList from '../hooks/cartItem/useCartItemList';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import CartItemListSection from '../components/CartItemListSection/CartItemListSection';
import { useSelectedCartItemIdList } from '../hooks/cartItem/useSelectedCartItemIdList';

const CartPage = () => {
  const { cartItemList } = useCartItemList();
  const { selectedIdList } = useSelectedCartItemIdList();

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <CartItemListSection />
        </Suspense>
      </ErrorBoundary>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', maxWidth: '768px', bottom: '0' }}
        isDisabled={
          selectedIdList.length === 0 ||
          (cartItemList !== null && cartItemList.length === 0)
        }
        onClick={() => navigate('/confirm-purchase')}
      >
        주문 확인
      </Button>
    </>
  );
};

export default CartPage;
