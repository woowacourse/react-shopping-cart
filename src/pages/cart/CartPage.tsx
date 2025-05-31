import { getCartItems } from '@/components/features/cart/api/getCartItems';
import CartContents from '@/components/features/cart/cartContents/CartContents';
import { createResource } from '@/components/features/cart/utils/createResource';
import { Suspense, useState } from 'react';
import Header from '../../components/common/header/Header';
import LoadingContents from './components/loadingContents/LoadingContents';

function CartPage() {
  const [resource, setResource] = useState(() =>
    createResource(getCartItems())
  );

  const refetch = () => {
    setResource(createResource(getCartItems()));
  };

  return (
    <>
      <Header title="SHOP" />
      <Suspense fallback={<LoadingContents />}>
        <CartContents resource={resource} refetch={refetch} />
      </Suspense>
    </>
  );
}

export default CartPage;
