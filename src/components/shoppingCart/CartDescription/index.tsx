import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../../stores/cartItems";

import * as S from "./styled";

const CartDescription = () => {
  const cartItemsLength = useRecoilValue(cartItemsState).length;

  return (
    <S.Container>
      <div>현재 {cartItemsLength}종류의 상품이 담겨있습니다.</div>
    </S.Container>
  );
};

export default CartDescription;
