import styled from "styled-components";
import ShoppingCardList from "../components/ShoppingCardList/ShoppingCardList";
import ShoppingTitle from "../components/ShoppingTitle/ShoppingTitle";
import ShoppingPreview from "../components/ShoppingPreview/ShoppingPreview";
import { useFetchShoppingList } from "../hooks/useFetch";

const ShoppingCartPage = () => {
  useFetchShoppingList();

  return (
    <Styled.Container>
      <ShoppingTitle />
      <Styled.ShoppingSection>
        <ShoppingCardList />
        <ShoppingPreview />
      </Styled.ShoppingSection>
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
  ShoppingSection: styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
};
export default ShoppingCartPage;
