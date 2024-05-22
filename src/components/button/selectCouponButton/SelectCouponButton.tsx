import { CouponContentSection } from "../../couponContentSection/CouponContentSection";
import BaseButton from "../baseButton/baseButton";
import { StyledSelectCouponButton } from "./SelectCouponButton.styled";
import { useModal, Modal } from "choco-modal-component";

export interface SelectCouponButtonProps {
  onClick: () => void;
}

export const SelectCouponButton: React.FC<SelectCouponButtonProps> = ({ onClick = () => {} }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleButtonClick = () => {
    openModal();
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <BaseButton>
        <StyledSelectCouponButton onClick={handleButtonClick}>쿠폰 적용</StyledSelectCouponButton>
      </BaseButton>

      <Modal
        modalPosition="center"
        title="쿠폰을 선택해 주세요"
        closeButtonPosition="top"
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={() => {}}
        size="small"
      >
        <CouponContentSection />
      </Modal>
    </>
  );
};
