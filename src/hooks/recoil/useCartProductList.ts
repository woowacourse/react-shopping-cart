import { useRecoilState } from 'recoil';
import { cartIdListState } from '../../atoms/cartIdListAtom';

export const useCartProductList = () => {
  const [cartIdList, setCartIdList] = useRecoilState(cartIdListState);

  const addProductIdToCartIdList = (id: number) => {
    if (!cartIdList.some((cartId) => cartId === id)) {
      setCartIdList((current) => [...current, id]);

      fetch(`/cart-items`, {
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
      });

      fetch(`/cart-items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: 1 }),
      });
    }
  };

  const removeProductFromCartProductList = (id: number) => {
    setCartIdList((current) => current.filter((cartId) => cartId !== id));

    fetch(`/cart-items/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    addProductIdToCartIdList,
    removeProductFromCartProductList,
    cartIdList,
  };
};
