import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { Modal } from "easy-payments-ui";

import { checkedCouponList } from "@/store/selector/selectors";

import useCouponCalculate from "@/hooks/useCouponCalculate";
import useViewportWidth from "@/hooks/useViewportWidth";

const CouponModal = ({ children }: PropsWithChildren) => {
  const viewportWidth = useViewportWidth();

  const checkedCoupons = useRecoilValue(checkedCouponList);
  const { discountAmount } = useCouponCalculate(checkedCoupons);

  return (
    <Modal
      title="쿠폰을 선택해 주세요."
      width={viewportWidth * 0.8}
      confirmMessage={`총 ${discountAmount}원 할인 쿠폰 사용하기`}
    >
      {children}
    </Modal>
  );
};

export default CouponModal;
