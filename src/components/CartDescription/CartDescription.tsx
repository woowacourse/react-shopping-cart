import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../recoil/selectors/selectors";
import { Wrapper } from "./style";

const CartDescription = () => {
  const cartItemsLength = useRecoilValue(cartItemsState).length;

  return (
    <Wrapper>
      <div>현재 {cartItemsLength}종류의 상품이 담겨있습니다.</div>
    </Wrapper>
  );
};

export default CartDescription;
