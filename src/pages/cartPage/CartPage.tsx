import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCartItems } from "../../api";
import { ConfirmButton } from "../../components/button/confirmButton/ConfirmButton";
import { CartContentSection } from "../../components/cartContentSection/CartContentSection";
import { CartHeader } from "../../components/cartHeader/CartHeader";
import Header from "../../components/header/Header";
import { CART, ERROR_MESSAGES, HEADER_TYPES } from "../../constants";
import { cartItemsState } from "../../recoil/atoms/atoms";
import { categoryCountState } from "../../recoil/selector/selector";
import { StyledCartPage } from "./CartPage.styled";

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const categoryCount = useRecoilValue(categoryCountState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_CART_ITEMS, error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const buttonBackgroundColor =
    categoryCount === CART.EMPTY_THRESHOLD ? "rgba(190, 190, 190, 1)" : "rgba(0, 0, 0, 1)";

  return (
    <>
      <Header type={HEADER_TYPES.SHOP} />
      <StyledCartPage>
        <CartHeader categoryCount={categoryCount} />
        <CartContentSection categoryCount={categoryCount} />
      </StyledCartPage>
      <ConfirmButton text="주문 확인" backgroundColor={buttonBackgroundColor} />
    </>
  );
};
38;
