import { useRecoilValue } from "recoil";
import { Wrapper } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";

const CartDescription = () => {
  const { cartItemKind } = useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <div>현재 {cartItemKind}종류의 상품이 담겨있습니다.</div>
    </Wrapper>
  );
};

export default CartDescription;
