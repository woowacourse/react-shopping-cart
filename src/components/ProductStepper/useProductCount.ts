import { useEffect, useState } from 'react';

import useMyCart from '@components/ProductStepper/useMyCart';

const useProductCount = (productId: number) => {
  const { myCart, updateCartProductCount } = useMyCart(productId);
  const [productCount, setProductCount] = useState(
    () => myCart[productId] ?? 0
  );

  useEffect(() => {
    updateCartProductCount(productCount);
  }, [productCount, productId, updateCartProductCount]);

  return { productCount, setProductCount };
};

export default useProductCount;
