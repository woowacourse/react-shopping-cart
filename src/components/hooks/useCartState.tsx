import { useSetRecoilState } from 'recoil';
import { CartProductList, Product } from '../../types/productType';
import { cartState } from '../../atoms/CartState';

const getIndex = (list: CartProductList[], id: number) => {
  return list.findIndex((item: CartProductList) => item.id === id);
};

export const useCartState = (props: Product) => {
  const { id } = props;
  const setCartProductState = useSetRecoilState(cartState);

  const addToCartState = () => {
    setCartProductState((prev) => [
      ...prev,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  const increaseCount = () => {
    setCartProductState((prev) => {
      const index = getIndex(prev, id);

      const updatedCartList = [...prev];

      updatedCartList[index] = {
        ...updatedCartList[index],
        quantity: updatedCartList[index].quantity + 1,
      };

      return updatedCartList;
    });
  };

  const decreaseCount = (shouldDelete: boolean) => {
    setCartProductState((prev) => {
      const index = getIndex(prev, id);

      const updatedCartList = [...prev];

      if (updatedCartList[index].quantity > 1) {
        updatedCartList[index] = {
          ...updatedCartList[index],
          quantity: updatedCartList[index].quantity - 1,
        };
      } else if (shouldDelete && updatedCartList[index].quantity === 1) {
        return updatedCartList.filter(
          (item: CartProductList) => item.id !== id
        );
      }

      return updatedCartList;
    });
  };

  const deleteCartItem = () => {
    setCartProductState((prev) => {
      return [...prev].filter((item: CartProductList) => item.id !== id);
    });
  };

  return {
    addToCartState,
    increaseCount,
    decreaseCount,
    deleteCartItem,
  };
};
