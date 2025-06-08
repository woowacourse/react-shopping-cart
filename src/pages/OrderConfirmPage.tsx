import { css } from "@emotion/css";
import Header from "../components/@common/Header/Header";
import Text from "../components/@common/Text/Text";
import { useCartItemContext } from "../contexts/carItem/useCartItemContext";
import { useLocation, useNavigate } from "react-router";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import ToggleButton from "../components/@common/Button/ToggleButton/ToggleButton";
import TextButton from "../components/@common/Button/TextButton/TextButton";
import ConfirmCartItemCard from "../components/CartItemCard/ConfirmCartItemCard";
import { PriceSummary } from "../components/PriceSummary/PriceSummary";
import PageTitle from "../components/PageTitle/PageTitle";
import { useState } from "react";
import { CouponModal } from "../components/CouponModal/CouponModal";
import { useCoupon } from "../hooks/useCoupon";
import { useSelectedCartItemContext } from "../contexts/selectedCartItem/useSelectedCartItemContext";
import { getShippingFee } from "../utils/getShippingFee";
import { getTotalPrice } from "../utils/getTotalPrice";

const OrderConfirmPage = () => {
  const { cartItems } = useCartItemContext();
  const { selectedItemIds } = useSelectedCartItemContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderPrice = 0 } = state;

  const [isOpen, setIsOpen] = useState(false);
  const [isRemoteArea, setIsRemoteArea] = useState<boolean>(false);
  const selectedItems = cartItems.filter((cartItem) =>
    selectedItemIds.has(cartItem.id)
  );
  const {
    coupons,
    totalCouponDiscountAmount,
    selectedCouponIds,
    toggleCouponSelection,
    isAvailableCoupon,
  } = useCoupon({ orderPrice, isRemoteArea, selectedItems });
  const shippingFee = getShippingFee(orderPrice, isRemoteArea);
  const totalPrice = getTotalPrice(
    orderPrice,
    shippingFee,
    totalCouponDiscountAmount
  );

  return (
    <div className={OrderConfirmLayout}>
      <Header
        leadingIcon="./back-icon.svg"
        onLeadingClick={() => {
          navigate("/");
        }}
      />
      <div className={OrderConfirmPageStyles}>
        <PageTitle
          title="주문 확인"
          titleCaption={
            <>
              <Text text={`총 ${selectedItemIds.size}개를 주문합니다.`} />
              <Text text="최종 결제 금액을 확인해 주세요." />
            </>
          }
        />
        {selectedItems.map((item) => (
          <ConfirmCartItemCard key={item.id} cartItem={item} />
        ))}
        <TextButton
          text="쿠폰 적용"
          onClick={() => {
            setIsOpen(true);
          }}
          buttonStyled={{ width: "100%", height: "48px" }}
          textStyled={{ color: "#666666", fontSize: "15px" }}
        />
        <section className={PriceInfoStyle}>
          <Text text="배송 정보" type="medium" />
          <div className={ShippingToggleStyle}>
            <ToggleButton
              isSelected={isRemoteArea}
              onClick={() => setIsRemoteArea((prev: boolean) => !prev)}
            />
            <Text text="제주도 및 도서 산간 지역" />
          </div>
          <PriceSummary
            orderPrice={orderPrice}
            shippingFee={shippingFee}
            couponDiscount={totalCouponDiscountAmount}
            totalPrice={totalPrice}
          />
        </section>

        <CouponModal
          isOpen={isOpen}
          onModalClose={() => {
            setIsOpen(false);
          }}
          coupons={coupons}
          couponDiscountAmount={totalCouponDiscountAmount}
          selectedCouponIds={selectedCouponIds}
          toggleCouponSelection={toggleCouponSelection}
          isAvailableCoupon={isAvailableCoupon}
          orderPrice={orderPrice}
        />
      </div>
      <ConfirmButton
        text="주문하기"
        onClick={() => {
          navigate("/payment-confirm", {
            state: {
              totalPrice,
            },
          });
        }}
      />
    </div>
  );
};

export default OrderConfirmPage;

const OrderConfirmLayout = css`
  min-height: 100dvh;
  background-color: #ffffff;
`;

const OrderConfirmPageStyles = css`
  padding: 24px;
  min-height: calc(100vh - 64px);
  justify-content: center;
`;

const ShippingToggleStyle = css`
  margin-top: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const PriceInfoStyle = css`
  padding: 32px 0;
`;
