import { useRecoilState } from "recoil";
import { css } from "@emotion/css";
import { Modal } from "chlwlstlf-modal";

import { couponsAtom } from "../../recoil/atom/atom";
import { useCartCalculator } from "../../hooks/useCartCalculator/useCartCalculator";
import { Button, Information } from "../default";
import CouponItem from "./CouponItem";
import { formatCurrency } from "../../utils/formatCurrency";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CouponModal = ({ isOpen, onClose, onConfirm }: CouponModalProps) => {
  const [coupons] = useRecoilState(couponsAtom);

  const { calculateCouponTotal } = useCartCalculator();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      size="small"
    >
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <Modal.CloseButton onClick={onClose}></Modal.CloseButton>
      </Modal.Header>
      <Modal.Content>
        <Information title="쿠폰은 최대 2개까지 사용할 수 있습니다." />
        <div className={couponItemsCSS}>
          {coupons.map((coupon, index) => (
            <div key={index}>
              <CouponItem coupon={coupon} />
            </div>
          ))}
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={onConfirm}>총 {formatCurrency(calculateCouponTotal())} 할인 쿠폰 사용하기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponModal;

const couponItemsCSS = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
`;
