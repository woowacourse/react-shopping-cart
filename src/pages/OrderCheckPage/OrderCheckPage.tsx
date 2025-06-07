import Header from "../../components/layout/Header/Header";
import BackButton from "../../components/layout/Header/BackButton";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";
import OrderCheckContent from "../../components/OrderList/OrderListContent/OrderListContent";

import useCartItemList from "../../hooks/useCartItemList";
import { useErrorContext } from "../../contexts/ErrorContext";

import * as S from "../ShoppingCartPage/ShoppingCartPage.styles";

export default function OrderCheckPage() {
  const { state, cartItemList } = useCartItemList();
  const { errorMessage } = useErrorContext();

  if (state.isLoading) {
    return <div>로딩중..</div>;
  }
  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <S.ShoppingCart>
        {errorMessage && <ErrorBox />}
        <OrderCheckContent cartItemList={cartItemList} />
      </S.ShoppingCart>
    </>
  );
}
