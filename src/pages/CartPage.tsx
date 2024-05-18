import Header from '../components/Header/Header';
import { cartItemListState } from '../recoil/cartItemList/cartItemListSelector';
import { useRecoilValue } from 'recoil';
import Button from '../components/common/Button/Button';
import { cartItemSelectedIdListAtom } from '../recoil/cartItem/cartItemAtom';
import { useNavigate } from 'react-router-dom';
import CartItemListSection from '../components/CartItemListSection/CartItemListSection';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { Suspense } from 'react';
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';

const CartPage = () => {

  const cartItemList = useRecoilValue(cartItemListState);
  const selectedItemList = useRecoilValue(cartItemSelectedIdListAtom);

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
        isDisabled={selectedItemList.length === 0 || (cartItemList !== null && cartItemList.length === 0)}
        onClick={() => navigate('/confirm-purchase', { state: cartItemList.filter(({ cartItemId }) => selectedItemList.includes(cartItemId)) })}
      >
        주문 확인
      </Button>
    </>
  );
};

export default CartPage;
