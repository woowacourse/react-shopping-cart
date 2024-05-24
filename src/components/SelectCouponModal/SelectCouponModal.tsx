import { CustomModal } from 'woowacourse-todari-components';

import useDiscount from '../../hooks/price/useDiscount';
import SelectCouponModalSection from '../SelectCouponModalSection/SelectCouponModalSection';

interface SelectCouponModalProps {
  modalOpened: boolean;
  onClose: () => void;
}

const SelectCouponModal = ({
  modalOpened,
  onClose,
}: SelectCouponModalProps) => {
  const { totalDiscountAmount } = useDiscount();

  return (
    <CustomModal
      title="쿠폰을 선택해 주세요"
      size="medium"
      isOpened={modalOpened}
      onClose={onClose}
      primaryButton={{
        text: `총 ${totalDiscountAmount.toLocaleString('ko-kr')}원 할인 쿠폰 사용하기`,
        onClick: onClose,
      }}
      showCloseButton={true}
    >
      <SelectCouponModalSection />
    </CustomModal>
  );
};

export default SelectCouponModal;
