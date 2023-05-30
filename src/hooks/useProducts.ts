import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import productListState from '../store/product';
import { ProductItemType } from '../types';

const useProducts = () => {
  const [, setProducts] = useRecoilState(productListState);

  const fetchProductList = useCallback(async () => {
    const response = await fetch('/products');
    const productItems = await response.json();
    setProducts(
      productItems.map((item: ProductItemType) => {
        return {
          ...item,
          id: item.id,
        };
      })
    );
  }, [setProducts]);

  return { fetchProductList };
};

export default useProducts;
