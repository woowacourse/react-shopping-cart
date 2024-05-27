import { Modal, useModal } from "choco-modal-component";
import { useTotalDiscount } from "../../../hooks/useTotalDiscount";
import { CouponContentSection } from "../../couponContentSection/CouponContentSection";
import BaseButton from "../baseButton/baseButton";
import { StyledSelectCouponButton } from "./SelectCouponButton.styled";

export const SelectCouponButton: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleButtonClick = () => {
    openModal();
  };

  const totalDiscountPrice = useTotalDiscount();
  const formattedTotalDiscountPrice = isNaN(totalDiscountPrice)
    ? "0"
    : totalDiscountPrice.toLocaleString();
  const buttonText = `총 ${formattedTotalDiscountPrice}원 할인 쿠폰 사용하기`;

  const handleApplyButtonClick = () => {
    closeModal;
  };

  return (
    <>
      <BaseButton>
        <StyledSelectCouponButton onClick={handleButtonClick}>쿠폰 적용</StyledSelectCouponButton>
      </BaseButton>

      <Modal
        modalPosition="center"
        title="쿠폰을 선택해 주세요"
        closeButtonPosition="bottom"
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={() => {}}
        size="small"
        buttonText={buttonText}
      >
        <CouponContentSection onApplyButtonClick={handleApplyButtonClick} />
      </Modal>
    </>
  );
};
