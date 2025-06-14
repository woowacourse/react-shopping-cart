import Text from "../../../components/common/Text";
import { GetCouponResponse } from "../../../apis/couponApi";
import { formatTimeRange } from "./formatTimeRange";
import styled from "styled-components";

const CouponSummary = ({ coupon }: { coupon: GetCouponResponse }) => {
  const CouponSummaryArr = [];
  const { expirationDate, minimumAmount, availableTime } = coupon;

  if (expirationDate) {
    const date = new Date(expirationDate);

    const formatted = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    CouponSummaryArr.push(`만료일: ${formatted}`);
  }

  if (minimumAmount) {
    CouponSummaryArr.push(`최소 주문 금액: ${minimumAmount.toLocaleString("KO-KR")}원`);
  }

  if (availableTime) {
    CouponSummaryArr.push(`사용 가능 시간: ${formatTimeRange(availableTime.start, availableTime.end)}`);
  }

  return (
    <CouponCardInfoWrap>
      {CouponSummaryArr.map((text, index) => (
        <Text variant="body-2" key={index}>
          {text}
        </Text>
      ))}
    </CouponCardInfoWrap>
  );
};
export default CouponSummary;

const CouponCardInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
