import { Modal } from "choco-modal-component";
import { useTotalDiscount } from "../../hooks/useTotalDiscount";
import { formatPriceWithZero } from "../../utils/formatPrice";
import { CouponContentSection } from "../couponContentSection/CouponContentSection";

interface SelectCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelectCouponModal: React.FC<SelectCouponModalProps> = ({ isOpen, onClose }) => {
  const totalDiscountPrice = useTotalDiscount();
  const formattedTotalDiscountPrice = formatPriceWithZero(totalDiscountPrice);
  const buttonText = `총 ${formattedTotalDiscountPrice}원 할인 쿠폰 사용하기`;

  return (
    <Modal
      modalPosition="center"
      title="쿠폰을 선택해 주세요"
      closeButtonPosition="bottom"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {}}
      size="small"
      buttonText={buttonText}
    >
      <CouponContentSection />
    </Modal>
  );
};
