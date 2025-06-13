import { useRef } from "react";
import { useCouponManagerProvider } from "../../../contexts/CouponManagerProvider";
import { useModalClose } from "../../../hooks/modal/useModalClose";
import { CartItemType } from "../../../types/response";
import CouponList from "../CouponItemList/CouponList";
import {
  CloseButton,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
  XButton,
} from "./CouponModal.styles";

interface ModalProps {
  onClose: () => void;
  orderCost: number;
  cartItems: CartItemType[];
  discount: number;
  deliveryCost: number;
}

export default function CouponModal({
  onClose,
  orderCost,
  cartItems,
  discount,
  deliveryCost,
}: ModalProps) {
  const { onClickOverlay } = useModalClose({ closeModal: onClose });
  const { selectedCoupon, changeSelectedCoupon } = useCouponManagerProvider();
  const copyInitSelectedCoupon = useRef(selectedCoupon);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        id="modal-overlay"
        css={ModalOverlay}
        onClick={(e) => {
          changeSelectedCoupon(copyInitSelectedCoupon.current);
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
              changeSelectedCoupon(copyInitSelectedCoupon.current);
              onClose();
            }}
          >
            x
          </button>
        </div>
        <CouponList
          orderCost={orderCost}
          cartItems={cartItems}
          deliveryCost={deliveryCost}
        />
        <button css={CloseButton} onClick={onClose}>
          {`총 ${discount.toLocaleString()}원 할인 쿠폰 사용하기`}
        </button>
      </div>
    </>
  );
}
