import {
  Title,
  TitleContainer,
  Description,
  Subtitle,
} from "../../styles/@common/title/Title.styles";
import { ORDER_CONFIRMATION_MESSAGE } from "../../constants/systemMessages";
import { useLocation } from "react-router-dom";
import DisplayCartItem from "../../components/features/cartItem/DisplayCartItem";
import type { CartItemType } from "../../types/response";
import {
  PageWrapper,
  CartListContainer,
} from "../../styles/@common/page/Page.styles";
import Button from "../../components/@common/button/Button";
import { CheckboxContainer } from "../../styles/@common/checkBox/CheckBox.styles";
import Checkbox from "../../components/@common/checkbox/Checkbox";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import * as S from "./OrderConfirmationPage.styles";
import useRemoteAreaFee from "../../hooks/features/useRemoteAreaFee";
import useVisibilityObserver from "../../hooks/@common/useVisibilityObserver";
import Modal from "../../components/@common/modal/Modal";
import CouponModalContent from "../../components/@common/modal/contents/CouponModalContent";
import useCouponModal from "../../hooks/features/useCouponModal";
import { getValidCoupons } from "../../domains/coupon/validateCoupon";
import useCheckedCoupons from "../../hooks/features/useCheckedCoupons";
import {
  getBogoProductPrice,
  getDiscountedTotalOrderPrice,
  getTotalDiscountPrice,
} from "../../domains/coupon/calculateCoupon";
import useEasyNavigate from "../../hooks/useEasyNavigate";
import Loading from "../../components/@common/loading/Loading";
import ErrorFallback from "../../components/@common/errorFallBack/ErrorFallBack";

const OrderConfirmationPage = () => {
  const { ref: CartPriceRef, isVisible: isCartPriceVisible } =
    useVisibilityObserver({
      threshold: 0.1,
    });

  const { orderItems, orderPrice, deliveryFee } = useLocation().state;

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

  const totalDiscountPrice = getTotalDiscountPrice(isCheckedCoupons, {
    originTotalPrice: totalPriceWithRemoteArea,
    bogoProductPrice: getBogoProductPrice(orderItems),
    deliveryFee: deliveryFeeWithRemoteArea,
  });

  const discountedTotalOrderPrice = getDiscountedTotalOrderPrice(
    totalPriceWithRemoteArea,
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
        <p css={Description}>{ORDER_CONFIRMATION_MESSAGE(1, 2)}</p>
      </div>

      <div css={CartListContainer}>
        {orderItems.map((item: CartItemType) => (
          <DisplayCartItem key={item.id} cartData={item} />
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
                orderItems.length,
                orderItems.reduce(
                  (acc: number, item: CartItemType) => acc + item.quantity,
                  0
                ),
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
