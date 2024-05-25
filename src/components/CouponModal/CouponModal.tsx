import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { Modal, useModalAction } from "easy-payments-ui";

import { checkedCouponList } from "@/store/selector/selectors";

import useCouponCalculate from "@/hooks/useCouponCalculate";
import useViewportWidth from "@/hooks/useViewportWidth";

const CouponModal = ({ children }: PropsWithChildren) => {
  const viewportWidth = useViewportWidth();

  const checkedCoupons = useRecoilValue(checkedCouponList);
  const { discountAmount } = useCouponCalculate(checkedCoupons);

  const action = useModalAction();

  const CONFIRM_MESSAGE = discountAmount
    ? `총 ${discountAmount}원 할인 쿠폰 사용하기`
    : "할인 쿠폰이 적용되지 않았습니다.";

  const handleConfirmClick = () => {
    action.handleClose();
  };

  return (
    <Modal
      title="쿠폰을 선택해 주세요."
      width={viewportWidth * 0.8}
      confirmMessage={CONFIRM_MESSAGE}
      onConfirm={handleConfirmClick}
    >
      {children}
    </Modal>
  );
};

export default CouponModal;
