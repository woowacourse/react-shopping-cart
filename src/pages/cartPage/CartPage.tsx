import { useRecoilValue } from "recoil";
import { ConfirmButton } from "../../components/button";
import { CartContentSection } from "../../components/cartContentSection/CartContentSection";
import { CartHeader } from "../../components/cartHeader/CartHeader";
import Header from "../../components/header/Header";
import { BUTTON_COLORS, CART, HEADER_TYPES } from "../../constants";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
import { StyledCartPage } from "./CartPage.styled";
import { useFetchCartItems } from "../../hooks/useFetchCartItems";

export const CartPage: React.FC = () => {
  const { cartItems } = useFetchCartItems();
  const { uniqueItemCount } = useRecoilValue(cartSummarySelectorState);

  const buttonMode =
    uniqueItemCount === CART.EMPTY_THRESHOLD ? BUTTON_COLORS.LIGHT : BUTTON_COLORS.DARK;

  return (
    <>
      <Header type={HEADER_TYPES.SHOP} />
      <StyledCartPage>
        <CartHeader cartItemCount={cartItems.length} />
        <CartContentSection cartItemCount={cartItems.length} />
      </StyledCartPage>
      <ConfirmButton text="주문 확인" mode={buttonMode} />
    </>
  );
};
