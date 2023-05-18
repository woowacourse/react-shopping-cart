import styled from "styled-components";
import ShoppingCardList from "../components/ShoppingCardList/ShoppingCardList";
import ShoppingTitle from "../components/ShoppingTitle/ShoppingTitle";
import ShoppingPreview from "../components/ShoppingPreview/ShoppingPreview";

const ShoppingCartPage = () => {
  return (
    <Styled.Container>
      <ShoppingTitle />
      <ShoppingCardList />
      <ShoppingPreview />
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 34px;
    width: 70%;
  `,
};
export default ShoppingCartPage;
