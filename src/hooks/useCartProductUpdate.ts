import { useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  deleteTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';

const useCartProductUpdate = (
  id: number | undefined,
  quantity: number | undefined
) => {
  const setCartProducts = useSetRecoilState(cartProductState);

  const addCount = async () => {
    try {
      if (!quantity || !id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      const updatedQuantity = quantity + 1;

      await cartProductApis.patch(id, updatedQuantity);
      setCartProducts((prev) =>
        updateTargetQuantity(prev, id, updatedQuantity)
      );
    } catch {
      alert('해당 상품의 수량을 변경하는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const subtractCount = async () => {
    try {
      if (!quantity || !id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      const updatedQuantity = quantity - 1;

      if (updatedQuantity === 0) {
        await deleteProduct();
        return;
      }

      await cartProductApis.patch(id, updatedQuantity);
      setCartProducts((prev) =>
        updateTargetQuantity(prev, id, updatedQuantity)
      );
    } catch {
      alert('해당 상품의 수량을 변경하는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const deleteProduct = async () => {
    try {
      if (!id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      await cartProductApis.delete(id);
      setCartProducts((prev) => deleteTargetProduct(prev, id));
    } catch {
      alert('장바구니에서 삭제하는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { addCount, subtractCount, deleteProduct };
};

export default useCartProductUpdate;
