interface LocalShoppingCartType {
  id: number;
  isChecked: boolean;
}

export const UpdateLocalStorage = ({
  id,
  isChecked,
}: LocalShoppingCartType) => {
  const shoppingCarts = JSON.parse(
    localStorage.getItem('shopping-cart') ?? '[]',
  );
  const newShoppingCarts = shoppingCarts.filter(
    (value: LocalShoppingCartType) => value.id !== id,
  );
  newShoppingCarts.push({ id, isChecked });
  localStorage.setItem('shopping-cart', JSON.stringify(newShoppingCarts));
};

export const getLocalStorage = (): LocalShoppingCartType[] => {
  const shoppingCarts = JSON.parse(
    localStorage.getItem('shopping-cart') ?? '[]',
  );
  return shoppingCarts;
};
