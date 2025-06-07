import { Modal } from "hoyychoi-modal-component";
import Button from "../../../../components/common/Button";
import { CouponResponse } from "../../../../types/coupon";
import CouponList from "../CouponList";
import { useTempCoupon } from "./useTempCoupon";

interface CouponModalProps {
  coupons: CouponResponse[];
  availableCoupons: { code: string; discountAmount: number; selected: boolean }[];
  toggleCoupon: (code: string) => void;
  isCartModalOpen: boolean;
  handleCartModalClose: () => void;
}

const CouponModal = ({
  coupons,
  availableCoupons,
  toggleCoupon,
  isCartModalOpen,
  handleCartModalClose,
}: CouponModalProps) => {
  const { tempSelectedCoupons, discountPrice, handleTempToggleCoupon, handleApplyCoupon } = useTempCoupon({
    availableCoupons,
    toggleCoupon,
  });

  return (
    <Modal show={isCartModalOpen} onHide={handleCartModalClose}>
      <Modal.BackDrop />

      <Modal.Container style={{ width: "calc(100% - 48px)" }} gap={32}>
        <Modal.Header closeButton>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CouponList
            couponData={coupons}
            availableCoupons={availableCoupons}
            selectedCoupons={tempSelectedCoupons}
            toggleCoupon={handleTempToggleCoupon}
          />
        </Modal.Body>

        <Modal.Footer>
          <Modal.Trigger>
            <Button variant="primary" size="full" onClick={handleApplyCoupon}>
              총 {discountPrice}원 할인 쿠폰 사용하기
            </Button>
          </Modal.Trigger>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
};

export default CouponModal;
