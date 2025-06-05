import BackButton from "@/shared/components/BackButton/BackButton";
import { Header } from "@/shared/components/Header/Header.styled";
import useValidateLocationState from "@/shared/hooks/useValidateLocationState";
import { isValidOrderConfirmState } from "./validation/isValidOrderConfirmState";
import { ROUTES } from "@/shared/config/routes";
import Fallback from "@/shared/components/Fallback";
import OrderConfirmContent from "./OrderConfirmContent/OrderConfirmContent";
import { getOrderQuantity } from "@/domains/utils/getOrderQuantity";

export default function OrderConfirmPage() {
  const { state, isValidating } = useValidateLocationState({
    validationFn: isValidOrderConfirmState,
    redirectPath: ROUTES.CART,
  });

  if (isValidating) {
    return (
      <Fallback type="loading" message="주문 확인 페이지로 이동 중입니다.." />
    );
  }

  const { orderList } = state;
  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <OrderConfirmContent
        orderList={orderList}
        orderListCount={orderList.length}
        orderQuantity={getOrderQuantity(orderList)}
      />
    </>
  );
}
