import styled from "@emotion/styled";
import { Suspense } from "react";
import { getCouponData } from "../../../api/coupon";
import { Loading } from "../../../components/common";
import InfoText from "../../../components/common/InfoText";
import CouponApplyButton from "./CouponApplyButton";
import CouponCheckList from "./CouponCheckList";

function CouponModalContent({ onClose }: { onClose: () => void }) {
  return (
    <Container>
      <InfoText contentText="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      <Suspense fallback={<Loading />}>
        <CouponCheckList couponsResource={getCouponData()} />
      </Suspense>
      <CouponApplyButton onApply={() => onClose()} />
    </Container>
  );
}

export default CouponModalContent;

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
