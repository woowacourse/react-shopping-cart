import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCartItems } from "../../api";
import { cartItemsState } from "../../recoil/atoms";
import { ActionButton } from "../button/ActionButton";
import { CartItemCard } from "../cartItemCard/CartItemCard";
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from "./CartItemCardList.styled";

export const CartItemCardList: React.FC = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  return (
    <StyledCartItemCardList>
      <StyledCartItemSelectContainer>
        <ActionButton type="select" />
        <StyledCartItemSelectText>전체선택</StyledCartItemSelectText>
      </StyledCartItemSelectContainer>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} checked={false} {...item} />
      ))}
    </StyledCartItemCardList>
  );
};
