import { useRecoilValue } from "recoil";
import { Wrapper } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";
import { NormalText } from "../common";

const CartDescription = () => {
  const { cartItemKind } = useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <NormalText>현재 {cartItemKind}종류의 상품이 담겨있습니다.</NormalText>
    </Wrapper>
  );
};

export default CartDescription;
