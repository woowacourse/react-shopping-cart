import { useNavigate } from "react-router-dom";
import { Container } from "../../styles";
import { CartItemType } from "../../types/response";
import { BackIcon } from "../../constants/images";
import useSafeLocationState from "../../hooks/common/\buseSafeLocation";
import OrderItemList from "../../components/OrderSummary/OrderItemList/OrderItemList";
import CouponButton from "../../components/OrderSummary/CouponButton/CouponButton";
import CouponModal from "../../components/CouponModal/Modal/CouponModal";
import useModal from "../../hooks/modal/useModal";
import { getDeliveryCost, getOrderCost } from "../../domains/cost";
import { useState } from "react";
import { useCouponManagerProvider } from "../../contexts/CouponManagerProvider";
import useResetCouponOnUnmount from "../../hooks/orderSummary/useResetCouponOnUnmount";
import { calculateDiscountAmount } from "./discount.domain";
import { getAllQuantity } from "../../domains/quantity";
import Header from "../../components/Common/Header/Header";
import Description from "../../components/Common/Description/Description";
import CheckBox from "../../components/Common/CheckBox/CheckBox";
import Receipt from "../../components/Common/Receipt/Receipt";
import SubmitButton from "../../components/Common/SubmitButton/SubmitButton";
import { BACK, ORDER_COMPLETE } from "../../constants/path";

function OrderSummary() {
  useResetCouponOnUnmount();
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
      <Header icon={BackIcon} handleIconClick={() => navigate(BACK)} />
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
      <SubmitButton
        enabled={true}
        label="결제하기"
        onClick={() =>
          navigate(ORDER_COMPLETE, {
            state: {
              cartItems,
              totalCost: orderCost + deliveryCost - discountAmount,
            },
          })
        }
      />
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
