import Text from "../../../components/common/Text";
import { GetCouponResponse } from "../../../apis/couponApi";
import { formatTimeRange } from "./formatTimeRange";
import styled from "styled-components";

const couponInfo = ({ coupon }: { coupon: GetCouponResponse }) => {
  const couponInfoArr = [];
  const { expirationDate, minimumAmount, availableTime } = coupon;

  if (expirationDate) {
    const date = new Date(expirationDate);

    const formatted = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    couponInfoArr.push(`만료일: ${formatted}`);
  }

  if (minimumAmount) {
    couponInfoArr.push(`최소 주문 금액: ${minimumAmount.toLocaleString("KO-KR")}원`);
  }

  if (availableTime) {
    couponInfoArr.push(`사용 가능 시간: ${formatTimeRange(availableTime.start, availableTime.end)}`);
  }

  return (
    <CouponCardInfoWrap>
      {couponInfoArr.map((text, index) => (
        <Text variant="body-2" key={index}>
          {text}
        </Text>
      ))}
    </CouponCardInfoWrap>
  );
};
export default couponInfo;

const CouponCardInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
