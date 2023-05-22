import { useRecoilState, useSetRecoilState } from 'recoil';

import { Product } from 'src/types';
import useToast from './useToast';
import { useDeleteFetch, usePatchFetch, usePostFetch } from './useFetch';
import { countStepOperator } from 'src/utils';
import { deleteCartItemSelector, updateCart } from 'src/recoil/selector';

export type CountMethod = 'increase' | 'decrease';

const useCartUpdate = (product: Product) => {
  const { toast } = useToast();
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));
  const deleteCartItem = useSetRecoilState(deleteCartItemSelector);

  const { postData, error: postError } = usePostFetch();
  const { patchData, error: patchError } = usePatchFetch();
  const { deleteData, error: deleteError } = useDeleteFetch();

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    postData('/api/cart-items', { productId: product.id });

    if (postError.isError) {
      toast.error(postError.message);
      return;
    }

    setCartItem({ id: product.id, quantity: 1, product, isSelected: true });
    toast.success(`${product.name}이(가) 장바구니에 추가됐습니다.`);
  };

  const productCountMethod = (_: React.MouseEvent, type: CountMethod) => {
    if (!cartItem) return;
    const quantity = cartItem.quantity + countStepOperator(type, 1);

    patchData(`/api/cart-items/${cartItem.id}`, { quantity });

    if (patchError.isError) {
      toast.error(postError.message);
      return;
    }

    setCartItem({ ...cartItem, quantity });
  };

  const onChangeSelectToggle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!cartItem) return;
    const { checked } = event.currentTarget;

    const newItem = { ...cartItem, isSelected: checked };

    setCartItem(newItem);
  };

  const deleteItem = () => {
    if (!cartItem) return;
    deleteData(`/api/cart-items/${cartItem.id}`);

    if (deleteError.isError) {
      toast.error(deleteError.message);
      return;
    }

    deleteCartItem([cartItem.id]);
    toast.success(`${product.name}를 장바구니에 삭제했습니다.`);
  };

  return {
    currentCartItem: cartItem,
    productCountMethod,
    onSelectItem,
    onChangeSelectToggle,
    deleteItem,
  };
};

export default useCartUpdate;
