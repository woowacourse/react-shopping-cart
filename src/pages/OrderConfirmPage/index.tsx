import * as S from "./OrderConfirmPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import Header from "../../components/Header";
import PrevArrow from "../../components/icons/PrevArrow";
import { useLocation, useNavigate } from "react-router";

const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state)
    return (
      <S.Container>
        <S.Information>
          <Text variant="title-1">잘못된 접근입니다.</Text>
          <Button variant="secondary" size="full" onClick={() => navigate("/")}>
            돌아가기
          </Button>
        </S.Information>
      </S.Container>
    );

  const { cartItemsTotalQuantity, cartItemsCheckedCount, totalPrice } = location.state;

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
            <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
          </S.TextWrap>
        </S.Information>
        <S.ButtonWrap>
          <Button variant="disabled" onClick={() => {}}>
            결제하기
          </Button>
        </S.ButtonWrap>
      </S.Container>
    </>
  );
};

export default OrderConfirmPage;
