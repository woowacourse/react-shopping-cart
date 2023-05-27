import { Suspense } from 'react';

import CartPageSection from '../components/Cart/CartPageSection/CartPageSection';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/utils/LoadingSpinner/LoadingSpinner';

const CartListPage = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <CartPageSection />
        </Suspense>
      </main>
    </>
  );
};

export default CartListPage;
