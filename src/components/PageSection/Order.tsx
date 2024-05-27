import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import OrderHeader from '../PageHeader/OrderHeader';
import OrderProductList from '../ListManagement/OrderProductList';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

import * as O from './PageSection.style';
import { useRecoilValue } from 'recoil';
import { checkedCartItems } from '../../recoil/selectors';

export default function Order() {
  const order = useRecoilValue(checkedCartItems);
  const orderTotalQuantity = order.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <O.PageSectionStyle>
      <OrderHeader category={order.length} count={orderTotalQuantity} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<O.Loading>로딩중!</O.Loading>}>
          <OrderProductList />
        </Suspense>
      </ErrorBoundary>
    </O.PageSectionStyle>
  );
}
