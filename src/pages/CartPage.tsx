import { lazy, Suspense } from 'react';

import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Header from '../components/Header/Header';
import Button from '../components/common/Button/Button';
import useCartItemList from '../hooks/cartItem/useCartItemList';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import useAddCartItemsForTest from '../hooks/test/useAddCartItemsForTest';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import { useSelectedCartItemIdList } from '../hooks/cartItem/useSelectedCartItemIdList';

const CartItemListSection = lazy(
  () => import('../components/CartItemListSection/CartItemListSection'),
);

const CartPage = () => {
  const { cartItemList } = useCartItemList();
  const { selectedIdList } = useSelectedCartItemIdList();
  const { addCartItemsForTest } = useAddCartItemsForTest();

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          // TEST를 위한 아이템 추가 버튼
          <Button
            style={{
              position: 'fixed',
              inset: '36px 36px auto auto',
              backgroundColor: '#FFFF99',
              boxShadow: '2px 4px 8px 2px rgba(0, 0, 0, .16)',
            }}
            onClick={() => {
              addCartItemsForTest();
            }}
          >
            TEST : 아이템 추가하기
          </Button>
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
