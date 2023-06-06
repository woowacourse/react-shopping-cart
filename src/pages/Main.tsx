import { ErrorBoundary } from 'react-error-boundary';
import { Loading } from '../components/common/Loading';
import { ProductCardGrid } from '../components/mainPage/productCardGrid/ProductCardGrid';
import { Layout } from '../layout';
import { Suspense } from 'react';
import { ErrorFallback } from '../components/common/ErrorFallback';

function Main() {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <ProductCardGrid />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default Main;
