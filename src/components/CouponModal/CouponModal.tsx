import useViewportWidth from "@/hooks/useViewportWidth";
import { Modal } from "easy-payments-ui";
import { PropsWithChildren } from "react";

const CouponModal = ({ children }: PropsWithChildren) => {
  const viewportWidth = useViewportWidth();
  return (
    <Modal title="쿠폰을 선택해 주세요." width={viewportWidth * 0.8} confirmMessage={`총 amount원 할인 쿠폰 사용하기`}>
      {children}
    </Modal>
  );
};

export default CouponModal;
