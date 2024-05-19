import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getCartItems } from "../../api";
import { ConfirmButton } from "../../components/button/confirmButton/ConfirmButton";
import { CartContentSection } from "../../components/cartContentSection/CartContentSection";
import { CartHeader } from "../../components/cartHeader/CartHeader";
import Header from "../../components/header/Header";
import { BUTTON_COLORS, CART, ERROR_MESSAGES, HEADER_TYPES } from "../../constants";
import { cartItemsState } from "../../recoil/atoms/atoms";
import { categoryCountState } from "../../recoil/selector/selector";
import { StyledCartPage } from "./CartPage.styled";

export const CartPage: React.FC = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
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
  }, []);

  const buttonMode =
    categoryCount === CART.EMPTY_THRESHOLD ? BUTTON_COLORS.LIGHT : BUTTON_COLORS.DARK;

  return (
    <>
      <Header type={HEADER_TYPES.SHOP} />
      <StyledCartPage>
        <CartHeader categoryCount={categoryCount} />
        <CartContentSection categoryCount={categoryCount} />
      </StyledCartPage>
      <ConfirmButton text="주문 확인" mode={buttonMode} />
    </>
  );
};
