import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import OrderHeader from '../PageHeader/OrderHeader';
import OrderList from '../ProductList/OrderList';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

import * as O from './PageSection.style';

export default function Order() {
  return (
    <O.PageSectionStyle>
      <OrderHeader category={1} count={1} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<O.Loading>로딩중!</O.Loading>}>
          <OrderList />
        </Suspense>
      </ErrorBoundary>
    </O.PageSectionStyle>
  );
}
