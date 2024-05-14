import CartItemContainer from "./Cart/CartItemContainer/CartItemContainer";
import CartResults from "./Cart/CartResults/CartResults";
import CartTitle from "./Cart/CartTitle/CartTitle";

const Main = () => {
  return (
    <main>
      <CartTitle></CartTitle>
      <CartItemContainer></CartItemContainer>
      <CartResults></CartResults>
    </main>
  );
};

export default Main;
