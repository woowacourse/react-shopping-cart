import { Counter } from "./Counter";
import { AddShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { useCartList } from "../../hooks/useCartList";

interface CardButton {
  id: number;
}

export const CardButton = ({ id }: CardButton) => {
  const { addItemToCartList, removeItemFromCartList, isInCart } = useCartList(id);

  return (
    <>
      {isInCart ? <Counter {...{ removeItemFromCartList }} /> : <AddShoppingCartIcon handleClick={addItemToCartList} />}
    </>
  );
};
