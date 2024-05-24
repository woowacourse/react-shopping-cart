import { CustomModal } from 'woowacourse-todari-components';
import SelectCouponModalSection from '../SelectCouponModalSection/SelectCouponModalSection';
import { useRecoilValue } from 'recoil';
import { totalDiscountSelector } from '../../recoil/discount/discountSelector';

interface SelectCouponModalProps {
  modalOpened: boolean;
  onClose: () => void;
}

const SelectCouponModal = ({
  modalOpened,
  onClose,
}: SelectCouponModalProps) => {
  const totalDiscount = useRecoilValue(totalDiscountSelector);
  return (
    <CustomModal
      title="쿠폰을 선택해 주세요"
      size="medium"
      isOpened={modalOpened}
      onClose={onClose}
      primaryButton={{
        text: `총 ${totalDiscount.toLocaleString('ko-kr')}원 할인 쿠폰 사용하기`,
      }}
      showCloseButton={true}
    >
      <SelectCouponModalSection />
    </CustomModal>
  );
};

export default SelectCouponModal;
