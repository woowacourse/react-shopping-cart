import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import * as S from "./OrderConfirmPage.styled";
import { useLocation } from "react-router";

const OrderConfirmPage = () => {
  const { cartItemsTotalQuantity, cartItemsCheckedCount, totalPrice } = useLocation().state;

  return (
    <S.Container>
      <S.Information>
        <Text variant="title-1">주문확인</Text>
        <S.TextWrap>
          <Text variant="body-3">
            총 {cartItemsCheckedCount}종류의 상품 {cartItemsTotalQuantity}개를 주문합니다.
          </Text>
          <Text variant="body-3">최종 결제 금액을 확인해 주세요.</Text>
        </S.TextWrap>
        <S.TextWrap gap={12}>
          <Text variant="body-1">총 결제 금액</Text>
          <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
        </S.TextWrap>
      </S.Information>
      <S.ButtonWrap>
        <Button variant="disabled" onClick={() => {}}>
          결제하기
        </Button>
      </S.ButtonWrap>
    </S.Container>
  );
};

export default OrderConfirmPage;
