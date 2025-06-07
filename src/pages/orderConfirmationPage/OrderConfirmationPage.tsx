import { useLocation } from "react-router-dom";

import Button from "../../components/@common/button/Button";
import Checkbox from "../../components/@common/checkbox/Checkbox";
import ErrorFallback from "../../components/@common/errorFallBack/ErrorFallBack";
import Loading from "../../components/@common/loading/Loading";
import Modal from "../../components/@common/modal/Modal";
import CouponModalContent from "../../components/@common/modal/contents/CouponModalContent";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import DisplayCartItem from "../../components/features/cartItem/DisplayCartItem";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import { CheckboxContainer } from "../../styles/@common/checkBox/CheckBox.styles";
import {
  PageWrapper,
  CartListContainer,
} from "../../styles/@common/page/Page.styles";
import {
  Title,
  TitleContainer,
  Description,
  Subtitle,
} from "../../styles/@common/title/Title.styles";
import * as S from "./OrderConfirmationPage.styles";

import useCheckedCoupons from "../../hooks/features/useCheckedCoupons";
import useCouponModal from "../../hooks/features/useCouponModal";
import useRemoteAreaFee from "../../hooks/features/useRemoteAreaFee";
import useVisibilityObserver from "../../hooks/@common/useVisibilityObserver";
import useEasyNavigate from "../../hooks/useEasyNavigate";

import { getValidCoupons } from "../../domains/coupon/validateCoupon";
import {
  getBogoItems,
  getDiscountedTotalOrderPrice,
  getTotalDiscountPrice,
} from "../../domains/coupon/calculateCoupon";
import { getOrderConfirmationMessage } from "../../constants/systemMessages";

import type { CartItemType } from "../../types/response";

const OrderConfirmationPage = () => {
  const { ref: CartPriceRef, isVisible: isCartPriceVisible } =
    useVisibilityObserver({
      threshold: 0.1,
    });

  const { orderItems, orderPrice, deliveryFee } = useLocation().state;
  const productTypeCount = orderItems.length;
  const totalProductCount = orderItems.reduce(
    (acc: number, item: CartItemType) => acc + item.quantity,
    0
  );

  const {
    isModalOpen,
    openCouponModal,
    closeCouponModal,
    couponList,
    loadingState,
  } = useCouponModal();

  // TODO : 초기값으로 최대 할인율 조합을 계산하여 삽입할 것
  const { isCheckedCoupons, toggleCheckedCoupon } = useCheckedCoupons();

  const {
    isRemoteArea,
    deliveryFeeWithRemoteArea,
    totalPriceWithRemoteArea,
    toggleIsRemoteArea,
  } = useRemoteAreaFee({ deliveryFee, orderPrice });

  const validCouponList = getValidCoupons(couponList, {
    originOrderPrice: orderPrice,
    orderItems,
    deliveryFee: deliveryFeeWithRemoteArea,
  });

  const checkedBogoCoupons = Array.from(isCheckedCoupons.values()).filter(
    (couponInfo) => couponInfo.code === "BOGO"
  );
  const bogoItems = checkedBogoCoupons.flatMap((couponInfo) =>
    "buyQuantity" in couponInfo
      ? [getBogoItems(orderItems, couponInfo.buyQuantity)]
      : []
  );
  const isBogoItem = (item: CartItemType) =>
    bogoItems.some((bogoItem) => bogoItem.id === item.id);

  const totalDiscountPrice = getTotalDiscountPrice(isCheckedCoupons, {
    originTotalPrice: totalPriceWithRemoteArea,
    bogoItems: bogoItems,
    deliveryFee: deliveryFeeWithRemoteArea,
  });
  const discountedTotalOrderPrice = getDiscountedTotalOrderPrice(
    orderPrice,
    totalDiscountPrice
  );

  const { goOrderComplete } = useEasyNavigate();

  const getModalContent = () => {
    if (loadingState === "initialLoading") {
      return <Loading />;
    }
    if (loadingState === "error") {
      return (
        <ErrorFallback callBack={closeCouponModal} errorButtonText="닫기" />
      );
    }
    if (loadingState === "success") {
      return (
        <CouponModalContent
          totalDiscountPrice={totalDiscountPrice}
          couponList={couponList}
          validCouponList={validCouponList}
          isCheckedCoupons={isCheckedCoupons}
          toggleCheckedCoupon={toggleCheckedCoupon}
          onModalClose={closeCouponModal}
        />
      );
    }
  };

  return (
    <div css={PageWrapper}>
      {isModalOpen && (
        <Modal
          title="쿠폰을 선택해 주세요"
          content={getModalContent()}
          onClose={closeCouponModal}
        />
      )}
      <div css={TitleContainer}>
        <p css={Title}>주문 확정</p>
        <p css={Description}>
          {getOrderConfirmationMessage(productTypeCount, totalProductCount)}
        </p>
      </div>

      <div css={CartListContainer}>
        {orderItems.map((item: CartItemType) => (
          <DisplayCartItem
            key={item.id}
            cartData={item}
            bogoQuantity={isBogoItem(item) ? checkedBogoCoupons.length : 0}
          />
        ))}
      </div>

      <Button size="large" color="white" onClick={openCouponModal}>
        쿠폰 적용
      </Button>

      <div css={TitleContainer}>
        <p css={Subtitle}>주문 금액</p>
        <div css={CheckboxContainer}>
          <Checkbox checked={isRemoteArea} onChange={toggleIsRemoteArea} />
          <p css={Description}>제주도 및 도서 산간 지역</p>
        </div>
      </div>

      <div css={S.CartPriceContainer} ref={CartPriceRef}>
        <CartPrice
          orderPrice={orderPrice}
          deliveryFee={deliveryFeeWithRemoteArea}
          discountPrice={totalDiscountPrice}
          totalPrice={discountedTotalOrderPrice}
        />
      </div>

      <div css={buttonFixedContainer}>
        {isCartPriceVisible && (
          <Button
            size="large"
            color="black"
            onClick={() => {
              goOrderComplete(
                productTypeCount,
                totalProductCount,
                discountedTotalOrderPrice
              );
            }}
          >
            주문 확정
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
