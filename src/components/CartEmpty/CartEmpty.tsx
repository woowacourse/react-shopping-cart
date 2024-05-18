import styled from "styled-components";
import { FlexCenter } from "@/styles/common";
import Caption from "../_common/Caption/Caption";
import OrderConfirmButton from "../OrderConfirmButton/OrderConfirmButton";

const CartEmpty = () => {
  return (
    <Wrapper>
      <Caption text="장바구니에 담은 상품이 없습니다."></Caption>
      <OrderConfirmButton disabled={true} />
    </Wrapper>
  );
};

export default CartEmpty;

const Wrapper = styled.div`
  ${FlexCenter}
  height:calc(100% - 128px);
`;
