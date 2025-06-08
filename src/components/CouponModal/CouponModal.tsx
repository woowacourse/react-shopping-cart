import { useCallback, useEffect, useRef } from "react";
import CouponList from "./CouponList";
import * as S from "./CouponModal.styled";
import { ResponseCartItem } from "../../types/types";
import formatPrice from "../../utils/formatPrice";
import {
  useSelectedCouponContext,
  useSelectedCouponDispatch,
} from "../../stores/SelectedCouponContext";

interface ModalProps {
  orderPrice: number;
  orderProducts: ResponseCartItem[];
  deliveryPrice: number;
  discountPrice: number;
  onClose: () => void;
}

export default function CouponModal({
  orderPrice,
  orderProducts,
  deliveryPrice,
  onClose,
  discountPrice,
}: ModalProps) {
  const selectedCouponDispatch = useSelectedCouponDispatch();
  const selectedCoupon = useSelectedCouponContext();
  const prevSelectedCoupon = useRef(selectedCoupon);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        selectedCouponDispatch({
          type: "SET_COUPON",
          payload: {
            coupons: prevSelectedCoupon.current,
          },
        });
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      onClose();
      selectedCouponDispatch({
        type: "SET_COUPON",
        payload: {
          coupons: prevSelectedCoupon.current,
        },
      });
    }
  };

  return (
    <>
      <S.ModalOverlay
        role="button"
        id="modal-overlay"
        onClick={handleOverlayClick}
      />
      <S.ModalContainer>
        <S.ModalTitle>
          <p>쿠폰을 선택해 주세요</p>
          <S.XButton onClick={onClose}>x</S.XButton>
        </S.ModalTitle>
        <S.Description>
          ⚠️ 쿠폰은 최대 2개까지 사용할 수 있습니다.
        </S.Description>
        <CouponList
          orderPrice={orderPrice}
          orderProducts={orderProducts}
          deliveryPrice={deliveryPrice}
        />
        <S.CloseButton onClick={onClose}>
          {`총 ${formatPrice(discountPrice)}원 할인 쿠폰 사용하기`}
        </S.CloseButton>
      </S.ModalContainer>
    </>
  );
}
