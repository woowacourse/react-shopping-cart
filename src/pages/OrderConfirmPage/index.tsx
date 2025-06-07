import * as S from "./OrderConfirmPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import useCart from "../../hooks/useCart";
import LoadingSpinner from "../../components/icons/LoadingSpinner";
import OrderCardList from "./components/OrderCardList";
import CheckBox from "../../components/common/CheckBox";
import PaymentPriceList from "./components/PaymentPriceList";
import CouponModal from "./components/CouponModal";
import { useState } from "react";
import { useNavigate } from "react-router";

const OrderConfirmPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(false);
  }
  const { isLoading, cartItemsInfo, cartItemListProps, orderResult } = useCart();

  const navigate = useNavigate();
  const handleNavigate = () => navigate("/payment-success", { state: orderResult });
  return (
    <S.Container>
      <Text variant="title-1">주문 확인</Text>
      <S.Information>
        <Text variant="body-3">현재 {cartItemsInfo.cartItemsCount}종류의 상품이 담겨있습니다.</Text>
        <OrderCardList cartItemListProps={cartItemListProps} />
        <Button variant="secondary" size="full" onClick={() => setIsOpen((prev) => !prev)}>
          쿠폰 적용
        </Button>
        <S.DeliveryInformation>
          <Text variant="title-2">배송 정보</Text>
          <CheckBox isChecked={false} onClick={() => setIsOpen((prev) => !prev)}>
            제주도 및 도서 산간 지역
          </CheckBox>
        </S.DeliveryInformation>
        <PaymentPriceList cartItemsInfo={cartItemsInfo} />
      </S.Information>
      <S.ButtonWrap>
        <Button variant="primary" onClick={handleNavigate}>
          결제하기
        </Button>
      </S.ButtonWrap>
      {isLoading && <LoadingSpinner />}
      {isOpen && <CouponModal onClose={handleClose} />}
    </S.Container>
  );
};

export default OrderConfirmPage;
