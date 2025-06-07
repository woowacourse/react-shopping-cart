import { Modal } from "hoyychoi-modal-component";
import Button from "../../../../components/common/Button";
import { CouponResponse } from "../../../../types/coupon";
import CouponList from "../CouponList";

interface CouponModalProps {
  coupons: CouponResponse[];
  isCartModalOpen: boolean;
  handleCartModalClose: () => void;
}

const CouponModal = ({ coupons, isCartModalOpen, handleCartModalClose }: CouponModalProps) => {
  return (
    <Modal show={isCartModalOpen} onHide={handleCartModalClose}>
      <Modal.BackDrop />

      <Modal.Container style={{ width: "calc(100% - 48px)" }} gap={32}>
        <Modal.Header closeButton>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CouponList couponData={coupons} />
        </Modal.Body>

        <Modal.Footer>
          <Modal.Trigger>
            <Button
              variant="primary"
              size="full"
              onClick={() => {
                /**뭔가 가격을 보내는 액션 */
              }}
            >
              총 5,000원 할인 쿠폰 사용하기
            </Button>
          </Modal.Trigger>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
};

export default CouponModal;
