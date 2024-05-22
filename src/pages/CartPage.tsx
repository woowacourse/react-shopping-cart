import Header from '../components/Header/Header';
import Button from '../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import CartItemListSection from '../components/CartItemListSection/CartItemListSection';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { Suspense } from 'react';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import useCartItemList from '../recoil/cartItemList/useCartItemList';
import { useCartItemSelectedIdList } from '../recoil/cartItem/useCartItemSelectedIdList';

const CartPage = () => {
  const { cartItemList } = useCartItemList();
  const { selectedIdList } = useCartItemSelectedIdList();

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
