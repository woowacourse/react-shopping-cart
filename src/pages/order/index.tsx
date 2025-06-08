import * as S from "./OrderPage.styled";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import PrevArrow from "../../components/icons/PrevArrow";
import Text from "../../components/common/Text";
import Button from "../../components/common/Button";
import OrderItemList from "./components/OrderItemList";
import DeliveryInformation from "./components/DeliveryInformation";
import useBooleanState from "../../hooks/common/useBooleanState";
import CouponModal from "./components/CouponModal";
import OrderPrice from "./components/OrderPrice";
import { useOrderContext } from "./contexts/OrderContext";
// import NotFoundPage from "../NotFoundPage";

// OrderConfirm 페이지가 받아야하는 정보
// check된 상품들 정보

const OrderPage = () => {
  const navigate = useNavigate();
  const [isCartModalOpen, handleCartModalOpen, handleCartModalClose] = useBooleanState(false);
  const { cartItemsTotalQuantity, cartItemsCheckedCount, finalTotalPrice } = useOrderContext();
  // if (!location.state) return <NotFoundPage />;

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
