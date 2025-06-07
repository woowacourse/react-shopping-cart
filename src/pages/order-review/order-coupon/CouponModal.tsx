import InfoNotice from '@/components/common/InfoNotice';
import { Modal } from '@/components/common/Modal';
import CouponInfo from './CouponInfo';
import { CouponContent } from '@/api/type';

interface CouponModalProps {
  show: boolean;
  onHide: () => void;
  coupons: CouponContent[];
  isLoading: boolean;
  availableCoupons: CouponContent[];
  bestCouponIds: number[];
  totalDiscount: number;
}

const CouponModal = ({
  show,
  onHide,
  coupons,
  isLoading,
  availableCoupons,
  bestCouponIds,
  totalDiscount,
}: CouponModalProps) => (
  <Modal show={show} onHide={onHide} position='center'>
    <Modal.Header closeButton>
      <Modal.Title>쿠폰을 선택해주세요</Modal.Title>
    </Modal.Header>
    <Modal.Body height={400}>
      <InfoNotice iconSrc={`${import.meta.env.BASE_URL}assets/icons/Info.svg`}>
        쿠폰은 최대 2개까지 사용할 수 있습니다.
      </InfoNotice>
      {isLoading ? (
        <p>쿠폰을 불러오는 중입니다...</p>
      ) : coupons.length > 0 ? (
        coupons.map((coupon) => {
          const isAvailable = availableCoupons.some(
            (av) => av.id === coupon.id
          );
          const isAutoSelected = bestCouponIds.includes(coupon.id);
          return (
            <CouponInfo
              coupon={coupon}
              key={coupon.id}
              disabled={!isAvailable}
              isAutoSelected={isAutoSelected}
            />
          );
        })
      ) : (
        <p>사용 가능한 쿠폰이 없습니다.</p>
      )}
    </Modal.Body>
    <Modal.Footer buttonAlign='center'>
      <Modal.CancelButton onClick={onHide} width='100%'>
        총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
      </Modal.CancelButton>
    </Modal.Footer>
  </Modal>
);

export default CouponModal;
