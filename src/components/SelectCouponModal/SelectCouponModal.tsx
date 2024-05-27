import { lazy, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import useDiscount from '../../hooks/price/useDiscount';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import LoadingFallback from '../LoadingFallback/LoadingFallback';
import useSelectedCouponList from '../../hooks/coupon/useSelectedCouponList';
import { CustomModal } from 'woowacourse-todari-components';

const SelectCouponModalSection = lazy(
  () => import('../SelectCouponModalSection/SelectCouponModalSection'),
);

interface SelectCouponModalProps {
  modalOpened: boolean;
  onClose: () => void;
}

const SelectCouponModal = ({
  modalOpened,
  onClose,
}: SelectCouponModalProps) => {
  const { selectedCouponAmount } = useSelectedCouponList();
  const { totalDiscountAmount } = useDiscount();

  return (
    <CustomModal
      title="쿠폰을 선택해 주세요"
      size="medium"
      isOpened={modalOpened}
      onClose={onClose}
      primaryButton={{
        text:
          selectedCouponAmount !== 0
            ? `총 ${totalDiscountAmount.toLocaleString('ko-kr')}원 할인 쿠폰 사용하기`
            : '쿠폰 선택하기',
        onClick: onClose,
      }}
      showCloseButton={true}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <SelectCouponModalSection />
        </Suspense>
      </ErrorBoundary>
    </CustomModal>
  );
};

export default SelectCouponModal;
