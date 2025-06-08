import { useEffect } from "react";
import { useCouponManagerProvider } from "../../contexts/CouponManagerProvider";
import { useModalClose } from "../../hooks/modal/useModalClose";
import { CartItemType } from "../../types/response";
import CouponList from "./CouponList";
import {
  CloseButton,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
  XButton,
} from "./CouponModal.styles";
import { CouponType } from "../../types/coupon";

interface ModalProps {
  onClose: () => void;
  orderCost: number;
  cartItems: CartItemType[];
  discount: number;
}

let copyInitSelectedCoupon: CouponType[] = [];

export default function CouponModal({
  onClose,
  orderCost,
  cartItems,
  discount,
}: ModalProps) {
  const { onClickOverlay } = useModalClose({ closeModal: onClose });
  const { selectedCoupon, changeSelectedCoupon } = useCouponManagerProvider();

  useEffect(() => {
    copyInitSelectedCoupon = [...selectedCoupon];
  }, []);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        id="modal-overlay"
        css={ModalOverlay}
        onClick={(e) => {
          changeSelectedCoupon(copyInitSelectedCoupon);
          onClickOverlay(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClickOverlay;
        }}
      />
      <div css={ModalContainer}>
        <div css={ModalTitle}>
          <p>쿠폰을 선택해 주세요</p>
          <button
            css={XButton}
            onClick={() => {
              changeSelectedCoupon(copyInitSelectedCoupon);
              onClose();
            }}
          >
            x
          </button>
        </div>
        <CouponList orderCost={orderCost} cartItems={cartItems} />
        <button css={CloseButton} onClick={onClose}>
          {`총 ${discount.toLocaleString()}원 할인 쿠폰 사용하기`}
        </button>
      </div>
    </>
  );
}
