/** @jsxImportSource @emotion/react */
import CartItemContainer from "./Cart/CartItemContainer/CartItemContainer";
import CartResults from "./Cart/CartResults/CartResults";
import CartTitle from "./Cart/CartTitle/CartTitle";

import { MainStyle } from "./Main.style";

const Main = () => {
  return (
    <main css={MainStyle}>
      <CartTitle></CartTitle>
      <CartItemContainer></CartItemContainer>
      <CartResults></CartResults>
    </main>
  );
};

export default Main;
