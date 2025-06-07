import styled from "@emotion/styled";
import InfoText from "../../../components/common/InfoText";
import CouponCheckItem from "../../../components/common/coupon/CouponCheckItem";
import { useState } from "react";
import CouponApplyButton from "./CouponApplyButton";

function CouponModalContent({ onClose }: { onClose: () => void }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckToggle = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <Container>
      <InfoText contentText="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      <CoupontCheckList>
        <CouponCheckItem
          isChecked={isChecked}
          onToggle={handleCheckToggle}
          titleText="5,000원 할인 쿠폰"
          expiryDate={[24, 11, 30]}
          details={[
            ["최소 주문 금액", "100,000원"],
            ["할인 금액", "5,000원"],
          ]}
        />
      </CoupontCheckList>
      <CouponApplyButton onApply={() => onClose()} />
    </Container>
  );
}

export default CouponModalContent;

const Container = styled.div``;
const CoupontCheckList = styled.ul`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
`;
