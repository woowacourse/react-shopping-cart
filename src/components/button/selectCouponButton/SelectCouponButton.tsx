import { useModal } from "choco-modal-component";
import { SelectCouponModal } from "../../selectCouponModal/SelectCouponModal";
import BaseButton from "../baseButton/baseButton";
import { StyledSelectCouponButton } from "./SelectCouponButton.styled";

export const SelectCouponButton: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleButtonClick = () => {
    openModal();
  };

  return (
    <>
      <BaseButton>
        <StyledSelectCouponButton onClick={handleButtonClick}>쿠폰 적용</StyledSelectCouponButton>
      </BaseButton>

      <SelectCouponModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
