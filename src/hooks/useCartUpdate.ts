import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { Product } from 'src/types';
import useToast from './useToast';
import {
  useDeleteFetch,
  useGetFetch,
  usePatchFetch,
  usePostFetch,
} from './useFetch';
import { countStepOperator } from 'src/utils';
import { deleteCartItemSelector, updateCart } from 'src/recoil/selector';
import { fetchAPI } from 'src/api';
import { cartListAtom } from 'src/recoil/atom';
import { useState } from 'react';

export type CountMethod = 'increase' | 'decrease';

const useCartUpdate = (product: Product) => {
  const { toast } = useToast();

  const updateCartList = useRecoilCallback(({ set }) => async () => {
    const cartItems = await fetchAPI('/api/cart-items');

    set(cartListAtom, cartItems);
  });

  const [curCartItem, setCurCartItem] = useRecoilState(updateCart(product.id));

  const [cartItem, setCartItem] = useState(curCartItem);

  const { postData, error: postError } = usePostFetch();
  const { patchData, error: patchError } = usePatchFetch();
  const { deleteData, error: deleteError } = useDeleteFetch();

  const addCartItem = () => {
    postData('/api/cart-items', { productId: product.id });

    if (postError.isError) {
      toast.error(postError.message);
      return;
    }

    setCartItem({
      id: product.id,
      quantity: 1,
      product: product,
      isSelected: true,
    });

    updateCartList();
    toast.success(`${product.name}이(가) 장바구니에 추가됐습니다.`);
  };

  const patchCartItem = (_: React.MouseEvent, type: CountMethod) => {
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

  const onChangeSelectToggle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!cartItem) return;
    const { checked } = event.currentTarget;

    const newItem = { ...cartItem, isSelected: checked };

    setCurCartItem(newItem);
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
    toast.success(`${product.name}를 장바구니에 삭제했습니다.`);
  };

  return {
    currentCartItem: cartItem,
    patchCartItem,
    addCartItem,
    onChangeSelectToggle,
    deleteItem,
  };
};

export default useCartUpdate;
