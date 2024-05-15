import { ConfirmButton } from "../components/button/ConfirmButton";
import { CartContentSection } from "../components/cartContentSection/CartContentSection";
import { CartHeader } from "../components/cartHeader/CartHeader";
import Header from "../components/header/Header";
import { StyledCartPage } from "./CartPage.styled";

export const CartPage: React.FC = () => {
  const categoryCount = 0;

  const buttonBackgroundColor =
    categoryCount === 0 ? "#d3d3d3" : "rgba(0, 0, 0, 1)";

  return (
    <>
      <Header type="shop" />
      <StyledCartPage>
        <CartHeader categoryCount={0} />
        <CartContentSection />
      </StyledCartPage>
      <ConfirmButton text="주문 확인" backgroundColor={buttonBackgroundColor} />
    </>
  );
};
38;
