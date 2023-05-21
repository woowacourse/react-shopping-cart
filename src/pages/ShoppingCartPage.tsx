import { useState } from "react";

import styled from "styled-components";

import LoadingPage from "./LoadingPage";
import ShoppingCardList from "../components/ShoppingCardList/ShoppingCardList";
import ShoppingTitle from "../components/ShoppingTitle/ShoppingTitle";
import ShoppingPreview from "../components/ShoppingPreview/ShoppingPreview";
import { useFetchShoppingList } from "../hooks/useFetch";

const ShoppingCartPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIsLoading = () => {
    setIsLoading(false);
  };

  useFetchShoppingList(handleIsLoading);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Styled.Container>
          <ShoppingTitle />
          <ShoppingCardList />
          <ShoppingPreview />
        </Styled.Container>
      )}
    </>
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
