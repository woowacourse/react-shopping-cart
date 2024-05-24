import React from "react";
import { css } from "@emotion/css";
import { Modal } from "chlwlstlf-modal";
import { useRecoilState } from "recoil";
import { couponsAtom } from "../../recoil/atom/atom";
import { Button, Information, Splitter } from "../default";
import CouponItem from "./CouponItem";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCartCalculator } from "../../hooks/useCartCalculator/useCartCalculator";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
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
              <Splitter />
              <CouponItem coupon={coupon} />
            </div>
          ))}
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={onClose}>총 {formatCurrency(calculateCouponTotal())} 할인 쿠폰 사용하기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponModal;

const couponItemsCSS = css`
  margin: 16px 0;
`;
