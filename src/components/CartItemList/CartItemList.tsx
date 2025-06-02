import React from "react";
import { CartItemType } from "../../types/response";
import CartItem from "../CartItem/CartItem";
import { Container } from "./CartItemList.styles";

interface CartItemListProps {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  isSelected: (cartId: number) => boolean;
  toggleSelect: (cartId: number) => void;
}

function CartItemList({
  cartItems,
  setCartItems,
  isSelected,
  toggleSelect,
}: CartItemListProps) {
  const handleCartItem = (cartId: number, newItem: CartItemType) => {
    setCartItems((prevItems) => {
      const targetIndex = prevItems.findIndex((item) => item.id === cartId);
      const newCartItems = [...prevItems];
      newCartItems[targetIndex] = newItem;

      return newCartItems;
    });
  };

  return (
    <section css={Container}>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            handleCartItem={handleCartItem}
            isSelected={isSelected(cartItem.id)}
            toggleSelect={() => toggleSelect(cartItem.id)}
          />
        );
      })}
    </section>
  );
}

export default CartItemList;
