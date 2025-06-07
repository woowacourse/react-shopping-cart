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

import useRemoteAreaFee from "../../hooks/features/useRemoteAreaFee";
import useVisibilityObserver from "../../hooks/@common/useVisibilityObserver";
import useEasyNavigate from "../../hooks/useEasyNavigate";

import {
  getTotalDiscountPrice,
  getDiscountedTotalPrice,
} from "../../domains/coupon/calculateCoupon";
import {
  isBogoItem,
  getBogoItemsInfo,
  getBogoGetQuantity,
} from "../../domains/coupon/bogo";
import { getOrderConfirmationMessage } from "../../constants/systemMessages";

import type { CartItemType } from "../../types/response";
import useCoupon from "../../hooks/features/useCoupon";
import useModal from "../../hooks/@common/useModal";
import type { BogoItemInfoType } from "../../types/bogo";

const OrderConfirmationPage = () => {
  const { ref: CartPriceRef, isVisible: isCartPriceVisible } =
    useVisibilityObserver({
      threshold: 0.1,
    });
  const { isModalOpen, openModal, closeModal } = useModal();
  const { goOrderComplete } = useEasyNavigate();

  const { orderItems, orderPrice, deliveryFee } = useLocation().state;

  const {
    isRemoteArea,
    toggleIsRemoteArea,
    deliveryFeeWithRemoteArea,
    orderPriceWithRemoteArea,
  } = useRemoteAreaFee({ deliveryFee, orderPrice });

  const {
    couponList,
    validCouponList,
    loadingState,
    checkedCoupons,
    toggleCheckedCoupon,
  } = useCoupon({
    orderPrice,
    orderItems,
    deliveryFee: deliveryFeeWithRemoteArea,
  });

  const bogoItemsInfo = getBogoItemsInfo(checkedCoupons, orderItems);
  const totalBogoGetQuantity = bogoItemsInfo.reduce(
    (acc: number, item: BogoItemInfoType) => acc + item.bogoQuantity,
    0
  );

  const productTypeCount = orderItems.length;
  const totalProductCount = orderItems.reduce(
    (acc: number, item: CartItemType) => acc + item.quantity,
    0
  );
  const totalDiscountPrice = getTotalDiscountPrice(checkedCoupons, {
    originOrderPrice: orderPriceWithRemoteArea,
    deliveryFee: deliveryFeeWithRemoteArea,
  });
  const discountedTotalPrice = getDiscountedTotalPrice(
    orderPriceWithRemoteArea,
    totalDiscountPrice
  );

  const getModalContent = () => {
    if (loadingState === "initialLoading") {
      return <Loading />;
    }
    if (loadingState === "error") {
      return <ErrorFallback callBack={closeModal} errorButtonText="닫기" />;
    }
    if (loadingState === "success") {
      return (
        <CouponModalContent
          totalDiscountPrice={totalDiscountPrice}
          bogoQuantity={totalBogoGetQuantity}
          couponList={couponList}
          validCouponList={validCouponList}
          checkedCoupons={checkedCoupons}
          toggleCheckedCoupon={toggleCheckedCoupon}
          onModalClose={closeModal}
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
          onClose={closeModal}
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
            bogoQuantity={
              isBogoItem(item, bogoItemsInfo)
                ? getBogoGetQuantity(bogoItemsInfo, item)
                : 0
            }
          />
        ))}
      </div>

      <Button
        type="button"
        size="large"
        color="white"
        onClick={(e) => {
          e.stopPropagation();
          openModal();
        }}
      >
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
          totalPrice={discountedTotalPrice}
        />
      </div>

      <div css={buttonFixedContainer}>
        {isCartPriceVisible && (
          <Button
            type="button"
            size="large"
            color="black"
            onClick={() => {
              goOrderComplete(
                productTypeCount,
                totalProductCount,
                discountedTotalPrice
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
