/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";

import { MainStyle } from "./Main.style";

import CartItemContainer from "./Cart/CartItemContainer/CartItemContainer";
import CartResults from "./Cart/CartResults/CartResults";
import CartTitle from "./Cart/CartTitle/CartTitle";

import OrderContainer from "./Order/OrderContainer";

const Main = () => {
  const { pathname } = useLocation();

  if (pathname !== "/" && pathname !== "/order") {
    return;
  }

  const routeTitle = {
    "/": (
      <>
        <CartTitle></CartTitle>
        <CartItemContainer></CartItemContainer>
        <CartResults></CartResults>
      </>
    ),
    "/order": <OrderContainer />,
  };

  return <main css={MainStyle}>{routeTitle[pathname]}</main>;
};

export default Main;
