import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/commons/Header/Header";
import SubmitButton from "../../components/commons/SubmitButton/SubmitButton";
import { Container, RedeemCouponButton } from "./OrderSummary.styles";
import { CartItemType } from "../../types/response";
import { getDeliveryCost, getOrderCost, getTotalCost } from "../../utils/cost";
import Description from "../../components/commons/Description/Description";
import CartItemList from "../../components/CartItemList/CartItemList";
import CartItem from "../../components/CartItem/CartItem";
import { createPortal } from "react-dom";
import { useState } from "react";
import CouponModal from "../CouponModal/CouponModal";
import ExtraShipping from "../../components/ExtraShipping/ExtraShipping";
import { CouponType } from "../../components/Coupon/types";
import OrderReceipt from "../../components/OrderReceipt/OrderReceipt";
import couponService from "../../domain/coupon/couponService";
import { filterNonExpiredCoupons } from "../../utils/coupon";

function OrderSummary() {
  const navigate = useNavigate();

  const location = useLocation();
  const { state: cartItems } = location;

  const getAllQuantity = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const [openModal, setOpenModal] = useState(false);
  const modalRoot = document.getElementById("root")!;

  const [isExtraShipping, setIsExtraShipping] = useState(false);
  const toggleExtraShipping = () => {
    setIsExtraShipping((prev) => !prev);
  };

  const [redeemedCoupons, setRedeemedCoupons] = useState<CouponType[]>([]);
  const redeemCoupons = (coupons: CouponType[]) => {
    setRedeemedCoupons(coupons);
  };

  const orderCost = getOrderCost(cartItems);
  const deliveryCost = getDeliveryCost(orderCost, isExtraShipping);
  const discount = couponService.calculateBestCouponDiscount({
    selectedCoupons: redeemedCoupons,
    selectedItems: cartItems,
    orderCost,
    deliveryCost,
  });
  const totalCost = getTotalCost(orderCost, deliveryCost, discount);

  const getExpectedDiscount = (selectedCoupons: CouponType[]) => {
    return couponService.calculateBestCouponDiscount({
      selectedCoupons,
      selectedItems: cartItems,
      orderCost,
      deliveryCost,
    });
  };

  const decideSelectedCouponCanRedeem = (coupon: CouponType) => {
    return couponService.decideCanRedeem({
      coupon,
      selectedItems: cartItems,
      orderCost,
      deliveryCost,
    });
  };

  return (
    <>
      <Header icon="backIcon.svg" handleIconClick={() => navigate(-1)} />
      <main css={Container}>
        <Description
          title="주문 확인"
          subtitle={`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        />
        <CartItemList>
          {cartItems.map((cartItem: CartItemType) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </CartItemList>
        <button
          css={RedeemCouponButton}
          type="button"
          onClick={() => setOpenModal(true)}
        >
          쿠폰 적용
        </button>
        <ExtraShipping
          isSelected={isExtraShipping}
          toggleSelect={toggleExtraShipping}
        />
        <OrderReceipt
          orderCost={orderCost}
          deliveryCost={deliveryCost}
          discount={discount}
          totalCost={totalCost}
        />
      </main>
      <SubmitButton
        enabled={true}
        label="결제하기"
        onClick={() =>
          navigate("/order-complete", {
            state: { totalCost, cartItems },
          })
        }
      />
      {openModal &&
        createPortal(
          <CouponModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            redeemCoupons={redeemCoupons}
            getDiscount={getExpectedDiscount}
            filterNonExpiredCoupons={filterNonExpiredCoupons}
            decideCanRedeem={decideSelectedCouponCanRedeem}
          />,
          modalRoot
        )}
    </>
  );
}
export default OrderSummary;
