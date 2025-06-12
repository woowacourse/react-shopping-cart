import Header from "../../components/layout/Header/Header";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";

import useCartItemList from "../../hooks/useCartItemList";

import * as S from "./ShoppingCartPage.styles";
import { useErrorContext } from "../../contexts/ErrorContext";
import ShoppingCartContent from "../../components/ShoppingCart/ShoppingCartContent/ShoppingCartContent";

export default function ShoppingCartPage() {
  const { state, cartItemList, patchCartItem, removeCartItem } =
    useCartItemList();
  const { errorMessage } = useErrorContext();

  if (state.isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <Header>SHOP</Header>
      <S.ShoppingCart>
        {errorMessage && <ErrorBox />}
        <ShoppingCartContent
          cartItemList={cartItemList}
          patchCartItem={patchCartItem}
          removeCartItem={removeCartItem}
        />
      </S.ShoppingCart>
    </>
  );
}
