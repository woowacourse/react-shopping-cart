import BackButton from "@/shared/components/BackButton/BackButton";
import { Header } from "@/shared/components/Header/Header.styled";
import Fallback from "@/shared/components/Fallback/Fallback";
import OrderConfirmContent from "./OrderConfirmContent/OrderConfirmContent";
import { useOrderConfirmPageState } from "./hooks/useOrderConfirmPageState";

export default function OrderConfirmPage() {
  const { orderList, isLoading } = useOrderConfirmPageState();

  if (isLoading) {
    return (
      <Fallback type="loading" message="주문 확인 페이지로 이동 중입니다.." />
    );
  }

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <OrderConfirmContent orderList={orderList} />
    </>
  );
}
