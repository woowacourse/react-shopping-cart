import { useRecoilState } from 'recoil';
import {
  cartItemsState,
  selectedCartIdListState,
} from '../../recoil/atoms/cartAtom';
import { useProductFetch } from '../fetch/useProductFetch';

export const useCartRecoil = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [, setSelectedCartIdList] = useRecoilState(selectedCartIdListState);
  const { getProductDetailById } = useProductFetch();

  const addRecoilCartById = async (id: number) => {
    if (cartItems.some((cartItem) => cartItem.id === id)) return;

    const product = await getProductDetailById(id);

    setCartItems((current) => {
      return [...current, { id: id, quantity: 1, product: product }];
    });
  };

  const deleteRecoilCartById = (id: number) => {
    setCartItems((current) => current.filter((cartItem) => cartItem.id !== id));
    setSelectedCartIdList((current) =>
      current.filter((selectedId) => selectedId !== id)
    );
  };

  const patchRecoilCartItemQuantity = (id: number, quantity: number) => {
    setCartItems((current) =>
      current.map((cartItem) => {
        if (cartItem.id === id) return { ...cartItem, quantity };
        return cartItem;
      })
    );
  };

  const getProductQuantityById = (id: number) => {
    return cartItems.find((cartItem) => cartItem.id === id)?.quantity;
  };

  const getIsCartIncludes = (id: number) => {
    return cartItems.some((cartItem) => cartItem.id === id);
  };

  const getCartItemIdList = () => {
    return cartItems.map((cartItem) => cartItem.id);
  };

  return {
    addRecoilCartById,
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
    getProductQuantityById,
    getIsCartIncludes,
    getCartItemIdList,
    cartItems,
  };
};
