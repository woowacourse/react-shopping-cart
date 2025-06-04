import { BASE_NAME } from "../../../constants/PageUrl";
import Header from "../../common/Header";
import * as Styled from "./CartHeader.style";

function CartHeader() {
  return (
    <Header>
      <a href={BASE_NAME}>
        <Styled.Title>SHOP</Styled.Title>
      </a>
    </Header>
  );
}

export default CartHeader;
