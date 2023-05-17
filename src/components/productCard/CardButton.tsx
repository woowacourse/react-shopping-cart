import { Counter } from "./Counter";
import { AddShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { useCartList } from "../../hooks/useCartList";
import { Id } from "../../types/Product";

interface CardButton {
  id: Id;
}

export const CardButton = ({ id }: CardButton) => {
  const { addItemToCartList, removeItemFromCartList, isInCart } = useCartList(id);

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
