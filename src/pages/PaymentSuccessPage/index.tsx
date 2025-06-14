import * as S from "./PaymentSuccessPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import { useLocation, useNavigate } from "react-router";

const PaymentSuccessPage = () => {
  const { state: orderItems } = useLocation();
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/");
  return (
    <S.Container>
      <S.Information>
        <Text variant="title-1">결제확인</Text>
        <S.TextWrap>
          <Text variant="body-3">
            총 {orderItems.orderItemsKind}종류의 상품 {orderItems.totalOrderItemsCount}개를 주문했습니다.
          </Text>
          <Text variant="body-3">최종 결제 금액을 확인해 주세요.</Text>
        </S.TextWrap>
        <S.TextWrap gap={12}>
          <Text variant="body-1">총 결제 금액</Text>
          <Text variant="title-1">{orderItems.totalPrice.toLocaleString()}원</Text>
        </S.TextWrap>
      </S.Information>
      <S.ButtonWrap>
        <Button variant="primary" onClick={handleNavigate}>
          장바구니로 돌아가기
        </Button>
      </S.ButtonWrap>
    </S.Container>
  );
};

export default PaymentSuccessPage;
