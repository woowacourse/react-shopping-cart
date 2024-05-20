import { useRecoilValue } from 'recoil';
import { cartData, cartQuantity } from '../../recoil/atoms/atoms';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CartHeader from '../CartHeader/CartHeader';
import ProductList from '../ProductList/ProductList';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import { CartStyle, EmptyCart, Loading } from './Cart.style';

export default function Cart() {
  const cartTotalCount = useRecoilValue(cartQuantity);
  const cartCount = useRecoilValue(cartData).length;

  return (
    <CartStyle>
      <CartHeader count={cartCount} />

      {cartTotalCount ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading>로딩중!</Loading>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <EmptyCart>장바구니에 담은 상품이 없습니다.</EmptyCart>
      )}
    </CartStyle>
  );
}
