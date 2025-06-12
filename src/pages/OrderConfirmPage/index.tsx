import * as S from "./OrderConfirmPage.styled";
import Text from "../../components/common/Text";
import OrderCardList from "./components/OrderCardList";
import PriceContainer from "./components/PriceContainer";
import { useLocation } from "react-router";

const OrderConfirmPage = () => {
  const { state: orderItems } = useLocation();

  return (
    <S.Container>
      <Text variant="title-1">주문 확인</Text>
      <S.Information>
        <Text variant="body-3">현재 {orderItems.length}종류의 상품이 담겨있습니다.</Text>
        <OrderCardList orderItems={orderItems} />
        <PriceContainer orderItems={orderItems} />
      </S.Information>
    </S.Container>
  );
};

export default OrderConfirmPage;
