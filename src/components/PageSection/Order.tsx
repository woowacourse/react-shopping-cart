import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import OrderHeader from '../PageHeader/OrderHeader';
import OrderProductList from '../ProductList/OrderProductList';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

import * as O from './PageSection.style';

export default function Order() {
  return (
    <O.PageSectionStyle>
      {/* TODO: category 수량과 총 주문 수량 데이터 받아서 뿌리기 */}
      <OrderHeader category={1} count={1} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<O.Loading>로딩중!</O.Loading>}>
          <OrderProductList />
        </Suspense>
      </ErrorBoundary>
    </O.PageSectionStyle>
  );
}
