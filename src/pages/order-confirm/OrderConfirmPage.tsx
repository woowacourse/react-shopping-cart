import BackButton from "@/shared/components/BackButton/BackButton";
import { Header } from "@/shared/components/Header/Header.styled";
import * as S from "./OrderConfirmPage.styled";
import useValidateLocationState from "@/shared/hooks/useValidateLocationState";
import { isOrderSuccessState } from "@/domains/validation/isOrderSuccessState";
import { ROUTES } from "@/shared/config/routes";
import Fallback from "@/shared/components/Fallback";
import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import OrderList from "./OrderList/OrderList";

export default function OrderConfirmPage() {
  const { state, isValidating } = useValidateLocationState({
    validationFn: isOrderSuccessState,
    redirectPath: ROUTES.CART,
  });

  if (isValidating) {
    return (
      <Fallback type="loading" message="주문 확인 페이지로 이동 중입니다.." />
    );
  }

  const { orderList, paymentPrice } = state;
  const orderListCount = orderList.length;
  const orderQuantity = orderList.reduce(
    (acc, { quantity }) => (acc += quantity),
    0
  );

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <S.Container>
        <OrderSummary
          title="주문 확인"
          orderListCount={orderListCount}
          orderQuantity={orderQuantity}
        />
        <OrderList orderList={orderList} />
      </S.Container>
    </>
  );
}
