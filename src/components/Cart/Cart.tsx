import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useRecoilValue } from 'recoil';
import { cartData, cartQuantity } from '../../recoil/atoms/atoms';

import CartHeader from '../CartHeader/CartHeader';
import ProductList from '../ProductList/ProductList';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

import * as S from './Cart.style';

// import { addCartItem } from '../../api';

export default function Cart() {
  const cartTotalCount = useRecoilValue(cartQuantity);
  const cartCount = useRecoilValue(cartData).length;

  // addCartItem(21); // NOTE: 장바구니 상품 추가

  return (
    <S.Container>
      <CartHeader count={cartCount} />

      {cartTotalCount ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<S.Loading>로딩중!</S.Loading>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
      )}
    </S.Container>
  );
}
