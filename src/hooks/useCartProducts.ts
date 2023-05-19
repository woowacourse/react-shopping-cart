import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import type { Product } from '../types/product';
import { deleteProduct, findTargetProduct } from '../utils/cartProduct';
import { postCartProducts } from '../apis/cartProducts';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);

  const addProduct = () => {
    setCartProducts((prev) => [...prev, { id, quantity: 1, product }]);
    postCartProducts(id);
  };

  const target = findTargetProduct(cartProducts, id);

  useEffect(() => {
    if (!target) return;

    if (target.quantity === 0) {
      setCartProducts((prev) => deleteProduct(prev, id));
    }
  }, [id, setCartProducts, target]);

  return { target, addProduct };
};

export default useCartProducts;
