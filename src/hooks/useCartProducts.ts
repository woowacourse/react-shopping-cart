import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import {
  cartProductState,
  targetCartProductSelector,
} from '../states/cartProducts';
import { addTargetProduct } from '../states/cartProducts/util';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const setCartProducts = useSetRecoilState(cartProductState);
  const targetProduct = useRecoilValue(targetCartProductSelector(id));

  const addProduct = async () => {
    try {
      await cartProductApis.post(id);
      setCartProducts((prev) => addTargetProduct(prev, product));
    } catch {
      alert('장바구니에 상품을 추가하는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { targetProduct, addProduct };
};

export default useCartProducts;
