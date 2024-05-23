import { useRecoilValue } from "recoil";
import { Wrapper } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";
import { SmallText, LargeText } from "../common";

const CartDescription = () => {
  const { cartItemKind } = useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <LargeText>장바구니</LargeText>
      <SmallText>현재 {cartItemKind}종류의 상품이 담겨있습니다.</SmallText>
    </Wrapper>
  );
};

export default CartDescription;
