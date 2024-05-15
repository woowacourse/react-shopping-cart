import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCartItems } from "../../api";
import { cartItemsState } from "../../recoil/atoms";
import { CartItemCardList } from "../cartItemCardList/CartItemCardList";
import { CartSummary } from "../cartSummary/CartSummary";
import {
  StyledCartContentSection,
  StyledContentContainer,
  StyledEmptyCartItemCard,
} from "./CartContentSection.styled";

export const CartContentSection: React.FC = () => {
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
    <StyledCartContentSection>
      {cartItems.length > 0 ? (
        <StyledContentContainer>
          <CartItemCardList />
          <CartSummary />
        </StyledContentContainer>
      ) : (
        <StyledEmptyCartItemCard>
          장바구니에 담은 상품이 없습니다.
        </StyledEmptyCartItemCard>
      )}
    </StyledCartContentSection>
  );
};
