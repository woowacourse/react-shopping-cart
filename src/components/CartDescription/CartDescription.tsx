import { useRecoilValue } from "recoil";
import { Wrapper } from "./style";
import { cartItemsAtom } from "../../recoil/atoms/atoms";

const CartDescription = () => {
  const cartItemsLength = useRecoilValue(cartItemsAtom).length;

  return (
    <Wrapper>
      <div>현재 {cartItemsLength}종류의 상품이 담겨있습니다.</div>
    </Wrapper>
  );
};

export default CartDescription;
