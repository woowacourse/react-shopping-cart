import { useRecoilState, useSetRecoilState } from 'recoil';
import { CartItem, Product } from 'src/types';
import useToast from './useToast';
import {
  useDeleteFetch,
  useGetFetch,
  usePatchFetch,
  usePostFetch,
} from './useFetch';
import { countStepOperator } from 'src/utils';
import { cartListAtom, cartSelectedItemAtom } from 'src/recoil/atom';
import { useState } from 'react';

export type CountMethod = 'increase' | 'decrease';

const useCartUpdate = (productId?: number) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useRecoilState(cartListAtom);
  const [cartItem, setCartItem] = useState<CartItem | null>(() => {
    if (!productId) return null;

    const curItem = cartItems.find((item) => item.id === productId);
    return curItem ?? null;
  });
  const setSelectedIds = useSetRecoilState(cartSelectedItemAtom);

  const { getData } = useGetFetch<CartItem[]>('/api/cart-items', []);
  const { postData, error: postError } = usePostFetch();
  const { patchData, error: patchError } = usePatchFetch();
  const { deleteData, error: deleteError } = useDeleteFetch();

  const addCartItem = async (product: Product) => {
    await postData('/api/cart-items', { productId: product.id });

    if (postError.isError) {
      toast.error(postError.message);
      return;
    }

    const item = {
      id: product.id,
      quantity: 1,
      product: product,
    };

    setCartItem(item);
    setCartItems((prev) => [...prev, item]);

    await getData();
    toast.success(`${product.name}이(가) 장바구니에 추가됐습니다.`);
  };

  const patchCartItem =
    (cartItem: CartItem | null) => async (type: CountMethod) => {
      if (!cartItem) return;
      const quantity = cartItem.quantity + countStepOperator(type, 1);

      await patchData(`/api/cart-items/${cartItem.id}`, { quantity });

      if (patchError.isError) {
        toast.error(patchError.message);
        return;
      }

      setCartItem({ ...cartItem, quantity });
      setCartItems((prev) => {
        const updated = prev.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        return updated;
      });
      await getData();
    };

  const deleteItem = async () => {
    if (!cartItem) return;
    await deleteData(`/api/cart-items/${cartItem.id}`);

    if (deleteError.isError) {
      toast.error(deleteError.message);
      return;
    }

    setCartItem(null);
    setCartItems((prev) => prev.filter((item) => item.id !== cartItem.id));
    await getData();
    toast.success(`${cartItem.product.name}를 장바구니에 삭제했습니다.`);
  };

  const checkedItemDelete = async (selectedIds: number[]) => {
    for (const id of selectedIds) {
      await deleteData(`/api/cart-items/${id}`);
    }

    const updated = cartItems.filter((item) => !selectedIds.includes(item.id));

    setCartItems(updated);
    setSelectedIds(updated.map(({ id }) => id));

    await getData();
  };

  return {
    currentCartItem: cartItem,
    patchCartItem,
    addCartItem,
    deleteItem,
    checkedItemDelete,
  };
};

export default useCartUpdate;
