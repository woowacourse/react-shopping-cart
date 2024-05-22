import { CustomModal } from 'woowacourse-todari-components';
import SelectCouponModalSection from '../SelectCouponModalSection/SelectCouponModalSection';

interface SelectCouponModalProps {
  modalOpened: boolean;
  onClose: () => void;
}

const SelectCouponModal = ({
  modalOpened,
  onClose,
}: SelectCouponModalProps) => {
  return (
    <CustomModal
      title="쿠폰을 선택해 주세요"
      size="l"
      isOpened={modalOpened}
      onClose={onClose}
      primaryButton={{ text: '총 6,000원 할인 쿠폰 사용하기' }}
      showCloseButton={true}
    >
      <SelectCouponModalSection />
    </CustomModal>
  );
};

export default SelectCouponModal;
