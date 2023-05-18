import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

import selectedShoppingItemState from '@Atoms/selectedShoppingItemState';

import { FETCH_URL } from '@Constants/index';

const useSelectedShoppingItem = () => {
  const [itemId, setItemId] = useRecoilState<number[]>(selectedShoppingItemState);

  const isSelected = (id: number) => itemId.includes(id);

  const updateSelectedShoppingItem = (id: number) => {
    if (isSelected(id)) setItemId((prev) => prev.filter((_id) => _id !== id));
    else setItemId((prev) => [...prev, id]);
  };

  useEffect(() => {
    const setInitValue = async () => {
      const response = await fetch(FETCH_URL.cartItems);
      const savedShoppingCart = (await response.json()) as ShoppingCartProduct[];
      setItemId(savedShoppingCart.map((cart) => cart.id));
    };

    setInitValue();
  }, []);

  return { isSelected, updateSelectedShoppingItem };
};

export default useSelectedShoppingItem;
