import { Counter } from "./Counter";
import { AddShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { useCartItem } from "../../hooks/useCartItem";
import { Id } from "../../types/Product";

interface CardButton {
  id: Id;
}

export const CardButton = ({ id }: CardButton) => {
  const { addItemToCartList, removeItemFromCartList, isInCart } = useCartItem(id);

  return (
    <>
      {isInCart() ? (
        <Counter handleMinValueExceeded={removeItemFromCartList} />
      ) : (
        <AddShoppingCartIcon handleClick={addItemToCartList} />
      )}
    </>
  );
};
