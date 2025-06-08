import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Container } from "../../styles";
import { CartItemType } from "../../types/response";
import { BackIcon } from "../../constants/images";
import useSafeLocationState from "../../hooks/common/\buseSafeLocation";
import Description from "../../components/Description/Description";
import OrderItemList from "../../components/OrderItemList/OrderItemList";
import CouponButton from "../../components/CouponButton/CouponButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import CouponModal from "../../components/CouponModal/CouponModal";
import useModal from "../../hooks/modal/useModal";
import { getDeliveryCost, getOrderCost } from "../../\bdomains/cost";
import { useState } from "react";
import { calculateDiscountAmount } from "../../\bdomains/discount";
import { useCouponManagerProvider } from "../../contexts/CouponManagerProvider";

function OrderSummary() {
  const [isJejuOrIslandSelected, setIsJejuOrIslandSelected] = useState(false);

  const { isOpen, modalClose, modalOpen } = useModal();
  const navigate = useNavigate();

  const { selectedCoupon } = useCouponManagerProvider();

  const cartItems = useSafeLocationState<CartItemType[]>();

  const orderCost = getOrderCost(cartItems);
  const deliveryCost =
    getDeliveryCost(orderCost) + (isJejuOrIslandSelected ? 3000 : 0);

  const discountAmount = calculateDiscountAmount({
    price: orderCost,
    cartItems,
    deliveryCost,
    selectedCoupon,
  });

  return (
    <>
      <Header icon={BackIcon} handleIconClick={() => navigate(-1)} />
      <section css={Container}>
        <Description
          title="주문 확인"
          subTitle={`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.\n
최종 결제 금액을 확인해 주세요.
          `}
        />
        <OrderItemList cartItems={cartItems} />
        <CouponButton onClick={modalOpen} />
        <div>
          <p>배송 정보</p>
          <CheckBox
            id="delivery"
            isSelected={isJejuOrIslandSelected}
            onClick={() => setIsJejuOrIslandSelected((prev) => !prev)}
            label="제주도 및 도서 산간 지역"
          />
        </div>
        <Receipt
          orderCost={orderCost}
          deliveryCost={deliveryCost}
          discount={discountAmount}
        />
      </section>
      <SubmitButton enabled={false} label="결제하기" />
      {isOpen && (
        <CouponModal
          onClose={modalClose}
          orderCost={orderCost}
          cartItems={cartItems}
          discount={discountAmount}
          deliveryCost={deliveryCost}
        />
      )}
    </>
  );
}
export default OrderSummary;

function getAllQuantity(cartItems: CartItemType[]) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
