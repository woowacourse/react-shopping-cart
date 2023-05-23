import { useRecoilCallback, useRecoilValue } from 'recoil';
import { CartItem, Product } from 'src/types';
import useToast from './useToast';
import { useDeleteFetch, usePatchFetch, usePostFetch } from './useFetch';
import { countStepOperator } from 'src/utils';
import { fetchAPI } from 'src/api';
import { cartListAtom } from 'src/recoil/atom';
import { useState } from 'react';

export type CountMethod = 'increase' | 'decrease';

const useCartUpdate = (productId?: number) => {
  const { toast } = useToast();

  const updateCartList = useRecoilCallback(({ set }) => async () => {
    const cartItems = await fetchAPI('/api/cart-items');

    set(cartListAtom, cartItems);
  });

  const cartItems = useRecoilValue(cartListAtom);

  const [cartItem, setCartItem] = useState<CartItem | null>(() => {
    if (!productId) return null;

    const curItem = cartItems.find((item) => item.id === productId);
    return curItem ?? null;
  });

  const { postData, error: postError } = usePostFetch();
  const { patchData, error: patchError } = usePatchFetch();
  const { deleteData, error: deleteError } = useDeleteFetch();

  const addCartItem = (product: Product) => {
    postData('/api/cart-items', { productId: product.id });

    if (postError.isError) {
      toast.error(postError.message);
      return;
    }

    setCartItem({
      id: product.id,
      quantity: 1,
      product: product,
    });

    updateCartList();
    toast.success(`${product.name}이(가) 장바구니에 추가됐습니다.`);
  };

  const patchCartItem = (cartItem: CartItem | null) => (type: CountMethod) => {
    if (!cartItem) return;
    const quantity = cartItem.quantity + countStepOperator(type, 1);

    patchData(`/api/cart-items/${cartItem.id}`, { quantity });

    if (patchError.isError) {
      toast.error(patchError.message);
      return;
    }

    setCartItem({ ...cartItem, quantity });

    updateCartList();
  };

  const deleteItem = () => {
    if (!cartItem) return;
    deleteData(`/api/cart-items/${cartItem.id}`);

    if (deleteError.isError) {
      toast.error(deleteError.message);
      return;
    }

    setCartItem(null);
    updateCartList();
    toast.success(`${cartItem.product.name}를 장바구니에 삭제했습니다.`);
  };

  const checkedItemDelete = (selectedIds: number[]) => {
    for (const id of selectedIds) {
      deleteData(`/api/cart-items/${id}`);
    }

    updateCartList();
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
