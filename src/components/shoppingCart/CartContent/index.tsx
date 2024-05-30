import useCartItems from "@/hooks/carts/useCartItems";

import CartDescription from "../CartDescription";
import CartItemList from "../CartItemList";
import CartPrice from "../CartPrice";

import * as S from "./styled";

const CartContent = () => {
  const { cartItemCount } = useCartItems();

  return (
    <S.Container>
      <CartDescription />
      {cartItemCount > 0 && (
        <>
          <CartItemList />
          <CartPrice />
        </>
      )}
    </S.Container>
  );
};

export default CartContent;
