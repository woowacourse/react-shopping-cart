import { useCallback, useEffect } from "react";
import CouponList from "./CouponList";
import * as S from "./CouponModal.styled";
import { ResponseCartItem } from "../../types/types";

interface ModalProps {
  orderPrice: number;
  orderProducts: ResponseCartItem[];
  onClose: () => void;
}

export default function CouponModal({
  orderPrice,
  orderProducts,
  onClose,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
        <CouponList orderPrice={orderPrice} orderProducts={orderProducts} />
        <S.CloseButton onClick={onClose}>
          {`총 ${6000}원 할인 쿠폰 사용하기`}
        </S.CloseButton>
      </S.ModalContainer>
    </>
  );
}
