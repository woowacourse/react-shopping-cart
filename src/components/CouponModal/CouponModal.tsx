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

interface ModalProps {
  onClose: () => void;
  orderCost: number;
  cartItems: CartItemType[];
}

export default function CouponModal({
  onClose,
  orderCost,
  cartItems,
}: ModalProps) {
  const { onClickOverlay } = useModalClose({ closeModal: onClose });

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        id="modal-overlay"
        css={ModalOverlay}
        onClick={onClickOverlay}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClickOverlay;
        }}
      />
      <div css={ModalContainer}>
        <div css={ModalTitle}>
          <p>쿠폰을 선택해 주세요</p>
          <button css={XButton} onClick={onClose}>
            x
          </button>
        </div>
        <CouponList orderCost={orderCost} cartItems={cartItems} />
        <button css={CloseButton} onClick={onClose}>
          {`총 ${6000}원 할인 쿠폰 사용하기`}
        </button>
      </div>
    </>
  );
}
