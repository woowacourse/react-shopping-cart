import { useRecoilValue } from 'recoil';
import { cartData, cartQuantity } from '../../recoil/atoms';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CartHeader from '../PageHeader/CartHeader';
import ProductList from '../ProductList/ProductList';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import * as C from './PageSection.style';

export default function Cart() {
  const cartTotalCount = useRecoilValue(cartQuantity);
  const cartCount = useRecoilValue(cartData).length;
  const isEmpty = cartTotalCount === 0;

  return (
    <C.PageSectionStyle>
      <CartHeader count={cartCount} />
      {isEmpty ? (
        <C.Empty>장바구니에 담은 상품이 없습니다.</C.Empty>
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<C.Loading>로딩중!</C.Loading>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      )}
    </C.PageSectionStyle>
  );
}
