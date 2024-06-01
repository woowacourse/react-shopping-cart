import { LocalShoppingCartType } from '../types/localStorage';

export const getLocalStorage = (): LocalShoppingCartType[] => {
  const shoppingCarts = JSON.parse(
    localStorage.getItem('shopping-cart') ?? '[]',
  );
  return shoppingCarts;
};

export const updateLocalStorage = ({
  id,
  isChecked,
}: LocalShoppingCartType) => {
  const shoppingCarts = getLocalStorage();
  const newShoppingCarts = shoppingCarts.filter(
    (value: LocalShoppingCartType) => value.id !== id,
  );
  newShoppingCarts.push({ id, isChecked });
  localStorage.setItem('shopping-cart', JSON.stringify(newShoppingCarts));
};

export const removeLocalStorage = (id: number) => {
  const shoppingCarts = getLocalStorage();
  const newShoppingCarts = shoppingCarts.filter((item) => item.id !== id);
  localStorage.setItem('shopping-cart', JSON.stringify(newShoppingCarts));
};
