import Modal from "../@common/Modal/Modal";
import Text from "../@common/Text/Text";
import FullWidthButton from "../@common/Button/FullWidthButton/FullWidthButton";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      position="center"
      size="small"
      title="쿠폰을 선택해 주세요"
      hasCloseButton={true}
      content={
        <div>
          <Text text="사용 가능한 쿠폰이 없습니다." />
        </div>
      }
      onClose={onClose}
      buttonElements={
        <FullWidthButton
          variant="dark"
          text="총 6,000원 할인 쿠폰 사용하기"
          onClick={onClose}
        />
      }
    />
  );
};

export default CouponModal;
