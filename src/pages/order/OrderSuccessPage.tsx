import BackButton from "@/shared/components/BackButton/BackButton";
import * as S from "./OrderSuccessPage.styled";
import Header from "@/shared/components/Header/Header";
import { ROUTES } from "@/shared/config/routes";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import useValidateLocationState from "../../shared/hooks/useValidateLocationState";

export type OrderSuccessState = {
  orderList: CartItemType[];
  paymentPrice: number;
};

const isOrderSuccessState = (state: any): state is OrderSuccessState => {
  if (!state) {
    return false;
  }

  if (typeof state !== "object") {
    return false;
  }

  if (
    !Array.isArray(state.orderList) ||
    typeof state.paymentPrice !== "number"
  ) {
    return false;
  }

  return true;
};

export default function OrderSuccessPage() {
  const { validatedState, isValidating } = useValidateLocationState({
    validationFn: isOrderSuccessState,
    redirectPath: ROUTES.CART,
  });

  if (isValidating || !validatedState) {
    return <div>로딩 중...</div>;
  }

  const { orderList, paymentPrice } = validatedState;
  const orderListType = orderList.length;
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
        <S.OrderContainer>
          <S.Title>주문 확인</S.Title>
          <S.OrderText>
            총 {orderListType}종류의 상품 {orderQuantity}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </S.OrderText>
          <S.OrderPriceContainer>
            <S.OrderPriceTitle>총 결제 금액</S.OrderPriceTitle>
            <S.OrderPriceText>
              {paymentPrice.toLocaleString()}원
            </S.OrderPriceText>
          </S.OrderPriceContainer>
        </S.OrderContainer>
        <S.PayConfirmButton disabled={true} type="button">
          결제하기
        </S.PayConfirmButton>
      </S.Container>
    </>
  );
}
