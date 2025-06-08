import * as S from "./OrderPage.styled";
import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import PrevArrow from "../../shared/components/icons/PrevArrow";
import Text from "../../shared/components/common/Text";
import Button from "../../shared/components/common/Button";
import OrderItemList from "./components/OrderItemList";
import DeliveryInformation from "./components/DeliveryInformation";
import useBooleanState from "../../shared/hooks/common/useBooleanState";
import CouponModal from "./components/CouponModal";
import OrderPrice from "./components/OrderPrice";
import { useOrderContext } from "./contexts/OrderContext";

const OrderPage = () => {
  const navigate = useNavigate();
  const [isCartModalOpen, handleCartModalOpen, handleCartModalClose] = useBooleanState(false);
  const { cartItemsTotalQuantity, cartItemsCheckedCount, finalTotalPrice } = useOrderContext();

  const handleNavigate = () =>
    navigate("/payment-confirm", { state: { cartItemsTotalQuantity, cartItemsCheckedCount, finalTotalPrice } });

  return (
    <>
      <Header>
        <PrevArrow onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
      </Header>
      <S.Container>
        <S.TextWrap gap={12}>
          <Text variant="title-1">주문 확인</Text>
          <S.TextWrap>
            <Text variant="body-3">
              총 {cartItemsCheckedCount}종류의 상품 {cartItemsTotalQuantity}개를 주문합니다.
            </Text>
            <Text variant="body-3">최종 결제 금액을 확인해 주세요.</Text>
          </S.TextWrap>
        </S.TextWrap>
        <OrderItemList />
        <Button variant="secondary" size="full" onClick={handleCartModalOpen}>
          쿠폰 적용
        </Button>
        <DeliveryInformation />
        <OrderPrice />
        <S.ButtonWrap>
          <Button variant="primary" onClick={handleNavigate}>
            결제하기
          </Button>
        </S.ButtonWrap>
      </S.Container>
      <CouponModal isCartModalOpen={isCartModalOpen} handleCartModalClose={handleCartModalClose} />
    </>
  );
};

export default OrderPage;
