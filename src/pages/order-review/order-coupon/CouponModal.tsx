import { CouponContent } from '@/api/type';
import InfoNotice from '@/components/common/InfoNotice';
import { Modal } from '@/components/common/Modal';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getDiscountByCouponId } from '../utils/getDiscountByCouponId';
import CouponInfo from './CouponInfo';
import { useOrderCoupons } from '../hooks/useOrderCoupons';

interface CouponModalProps {
  show: boolean;
  onHide: () => void;
  coupons: CouponContent[];
  isLoading: boolean;
  availableCoupons: CouponContent[];
  // bestCouponIds: number[];
  totalDiscount: number;
  handleApply: (couponIds: number[]) => void;
  isJejuOrRemoteArea: boolean;
}

const CouponModal = ({
  show,
  onHide,
  coupons,
  isLoading,
  availableCoupons,
  // bestCouponIds,
  handleApply,
  isJejuOrRemoteArea,
}: CouponModalProps) => {
  const { bestCouponIds } = useOrderCoupons(isJejuOrRemoteArea);
  const [selectedCouponIds, setSelectedCouponIds] =
    useState<number[]>(bestCouponIds);
  const isManual = useRef(false);
  useEffect(() => {
    if (!isManual.current && bestCouponIds.length > 0) {
      setSelectedCouponIds(bestCouponIds);
    }
  }, [bestCouponIds]);

  const handleApplyClick = () => {
    handleApply(selectedCouponIds);
    onHide();
  };

  const { selectedItems, orderPrice } = useOrderListContext();

  // useBestCouponCombination 대신 직접 계산
  const modalDiscount = useMemo(() => {
    const selectedCoupons = selectedCouponIds
      .map((id) => availableCoupons.find((c) => c.id === id))
      .filter(Boolean) as CouponContent[];

    return selectedCoupons.reduce((total, coupon) => {
      return (
        total +
        getDiscountByCouponId(
          coupon,
          orderPrice,
          selectedItems,
          isJejuOrRemoteArea
        )
      );
    }, 0);
  }, [
    selectedCouponIds,
    availableCoupons,
    orderPrice,
    selectedItems,
    isJejuOrRemoteArea,
  ]);

  return (
    <Modal
      data-testid='coupon-modal'
      show={show}
      onHide={onHide}
      position='center'
    >
      <Modal.Header closeButton>
        <Modal.Title>쿠폰을 선택해주세요</Modal.Title>
      </Modal.Header>
      <Modal.Body height={400}>
        <InfoNotice
          iconSrc={`${import.meta.env.BASE_URL}assets/icons/Info.svg`}
        >
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </InfoNotice>
        {isLoading ? (
          <p>쿠폰을 불러오는 중입니다...</p>
        ) : coupons.length > 0 ? (
          coupons.map((coupon) => {
            const isAvailable = availableCoupons.some(
              (av) => av.id === coupon.id
            );
            const checked = selectedCouponIds.includes(coupon.id);
            return (
              <CouponInfo
                coupon={coupon}
                key={coupon.id}
                disabled={!isAvailable}
                checked={checked}
                onSelectionChange={(isChecked) => {
                  isManual.current = true;
                  if (isChecked) {
                    // 체크: 추가 (최대 2개까지)
                    if (selectedCouponIds.length < 2) {
                      setSelectedCouponIds([...selectedCouponIds, coupon.id]);
                    }
                  } else {
                    // 해제: 제거
                    setSelectedCouponIds(
                      selectedCouponIds.filter((id) => id !== coupon.id)
                    );
                  }
                }}
              />
            );
          })
        ) : (
          <p>사용 가능한 쿠폰이 없습니다.</p>
        )}
      </Modal.Body>
      <Modal.Footer buttonAlign='center'>
        <Modal.CancelButton onClick={handleApplyClick} width='100%'>
          총 {modalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
        </Modal.CancelButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponModal;
