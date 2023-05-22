import { Counter } from "./Counter";
import { AddShoppingCartIcon } from "../../assets/ShoppingCartIcons";
import { useCartItem } from "../../hooks/useCartItem";
import { Id } from "../../types/Product";

interface CardButton {
  id: Id;
}

export const CardButton = ({ id }: CardButton) => {
  const { addItemToCartList, removeItemFromCartList, changeCartItemQuantity, isInCart, quantity } = useCartItem(id);

  return (
    <>
      {isInCart() ? (
        <Counter
          handleMinValueExceeded={removeItemFromCartList}
          handleValueChanged={changeCartItemQuantity}
          quantity={quantity}
          min={0}
        />
      ) : (
        <AddShoppingCartIcon handleClick={addItemToCartList} />
      )}
    </>
  );
};
