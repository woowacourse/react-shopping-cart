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

  const decreaseCount = () => {
    setCartProductState((prev) => {
      const index = getIndex(prev, id);

      const updatedCartList = [...prev];

      updatedCartList[index] = {
        ...updatedCartList[index],
        quantity: updatedCartList[index].quantity - 1,
      };

      if (updatedCartList[index].quantity === 0) {
        return updatedCartList.filter(
          (item: CartProductList) => item.id !== id
        );
      }

      return updatedCartList;
    });
  };

  return { addToCartState, increaseCount, decreaseCount };
};
