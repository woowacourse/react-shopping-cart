import * as S from "./PaymentPage.styled";
import Button from "../../shared/components/common/Button";
import Text from "../../shared/components/common/Text";
import Header from "../../shared/components/Header";
import PrevArrow from "../../shared/components/icons/PrevArrow";
import { useLocation, useNavigate } from "react-router";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/404");
    return null;
  }

  const { cartItemsTotalQuantity, cartItemsCheckedCount, finalTotalPrice } = location.state;
  const handleNavigate = () => navigate("/");

  return (
    <>
      <Header>
        <PrevArrow onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
      </Header>
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
            <Text variant="title-1">{finalTotalPrice.toLocaleString()}원</Text>
          </S.TextWrap>
        </S.Information>
        <S.ButtonWrap>
          <Button variant="primary" onClick={handleNavigate}>
            장바구니로 돌아가기
          </Button>
        </S.ButtonWrap>
      </S.Container>
    </>
  );
};

export default PaymentPage;
