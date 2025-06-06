import { Modal } from "hoyychoi-modal-component";
import Button from "../../../../components/common/Button";
import { CouponResponse } from "../../../../types/coupon";
import CouponList from "../CouponList";

interface CouponModalProps {
  isCartModalOpen: boolean;
  handleCartModalClose: () => void;
}

const dummy: CouponResponse[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

const CouponModal = ({ isCartModalOpen, handleCartModalClose }: CouponModalProps) => {
  return (
    <Modal show={isCartModalOpen} onHide={handleCartModalClose}>
      <Modal.BackDrop />

      <Modal.Container style={{ width: "calc(100% - 48px)" }} gap={32}>
        <Modal.Header closeButton>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CouponList couponData={dummy} />
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
