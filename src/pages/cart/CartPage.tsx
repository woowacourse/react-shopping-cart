import { getCartItems } from '@/components/features/cart/api/getCartItems';
import CartContents from '@/components/features/cart/cartContents/CartContents';
import { createResource } from '@/components/features/cart/utils/createResource';
import { Suspense, useState } from 'react';
import Header from '../../components/common/header/Header';

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
      <Suspense fallback={<div>loading...</div>}>
        <CartContents resource={resource} refetch={refetch} />
      </Suspense>
    </>
  );
}

export default CartPage;
