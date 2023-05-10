import { ShoppingBasketProduct, UpdateShoppingBasket } from '@Types/index';
import shoppingBasketState from '../../atoms/shoppingBasketState';
import { useRecoilState } from 'recoil';

const useShoppingBasket = () => {
  const [shoppingBasket, setShoppingBasket] = useRecoilState<ShoppingBasketProduct[]>(shoppingBasketState);

  const updateShoppingBasket: UpdateShoppingBasket = (product, quantity) => {
    const shoppingItem = shoppingBasket.find((item) => item.product.id === product.id);

    if (!shoppingItem) {
      const newShoppingItem = {
        id: Date.now(),
        quantity,
        product,
      };
      setShoppingBasket([...shoppingBasket, newShoppingItem]);
    } else if (quantity !== 0) {
      setShoppingBasket((prev) =>
        prev.map((item) => {
          if (item.product.id !== shoppingItem.product.id) return item;
          return {
            id: shoppingItem.id,
            quantity,
            product,
          };
        }),
      );
    } else {
      setShoppingBasket((prev) => prev.filter((item) => item.product.id !== shoppingItem.product.id));
    }
  };

  return { shoppingBasket, updateShoppingBasket };
};

export default useShoppingBasket;
