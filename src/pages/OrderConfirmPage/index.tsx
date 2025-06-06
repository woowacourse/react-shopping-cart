import * as S from "./OrderConfirmPage.styled";
import { useLocation, useNavigate } from "react-router";
import Header from "../../components/Header";
import PrevArrow from "../../components/icons/PrevArrow";
import Text from "../../components/common/Text";
import Button from "../../components/common/Button";
import { OrderPrice } from "../../components/Order/OrderPrice";
import OrderItemList from "../../components/Order/OrderItemList";
import DeliveryInformation from "../../components/Order/DeliveryInformation";
import useBooleanState from "../../hooks/common/useBooleanState";
import NotFoundPage from "../NotFoundPage";
import CouponModal from "./components/CouponModal";

// OrderConfirm 페이지가 받아야하는 정보
// check된 상품들 정보

const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartModalOpen, handleCartModalOpen, handleCartModalClose] = useBooleanState(false);

  if (!location.state) return <NotFoundPage />;

  const { cartItems, orderPrice, deliveryPrice, totalPrice, cartItemsTotalQuantity, cartItemsCheckedCount } =
    location.state;

  const handleNavigate = () => navigate("/payment-confirm", { state: location.state });
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

        <OrderItemList orderItems={cartItems} />

        <Button variant="secondary" size="full" onClick={handleCartModalOpen}>
          쿠폰 적용
        </Button>

        <DeliveryInformation handleCheckChange={() => {}} />

        <OrderPrice gap={12}>
          <OrderPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
          <OrderPrice.Wrap gap={8}>
            <OrderPrice.LabelWithPrice label="주문 금액" price={orderPrice} />
            <OrderPrice.LabelWithPrice label="쿠폰 할인 금액" price={deliveryPrice} />
            <OrderPrice.LabelWithPrice label="배송비" price={deliveryPrice} />
          </OrderPrice.Wrap>
          <OrderPrice.Wrap>
            <OrderPrice.LabelWithPrice label="총 결제 금액" price={totalPrice} />
          </OrderPrice.Wrap>
        </OrderPrice>

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

export default OrderConfirmPage;
