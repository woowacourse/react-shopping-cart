import { AvailableTimeType, ExpirationDateType } from "../../types/response";
import { convertTo12Hour, formatTime } from "../../utils/time";

interface CouponProps {
  description: string;
  expirationDate: ExpirationDateType;
  minimumAmount?: number;
  availableTime?: {
    start: AvailableTimeType;
    end: AvailableTimeType;
  };
}

function Coupon({
  description,
  expirationDate,
  minimumAmount,
  availableTime,
}: CouponProps) {
  const getAvailableTimeDescription = (availableTime: {
    start: AvailableTimeType;
    end: AvailableTimeType;
  }) => {
    const { start, end } = availableTime;
    const { period: startPeriod } = convertTo12Hour(start.hour);
    const { period: endPeriod } = convertTo12Hour(end.hour);
    if (startPeriod === endPeriod) {
      return `${startPeriod} ${formatTime(start)}부터 ${formatTime(end)}까지`;
    }

    return `${startPeriod} ${formatTime(start)}부터 ${endPeriod} ${formatTime(
      end
    )}까지`;
  };

  return (
    <div>
      <p>{description}</p>
      <p>
        만료일:
        {`${expirationDate.year}년 ${expirationDate.month}월 ${expirationDate.day}일`}
      </p>
      {minimumAmount && <p>최소 주문 금액: {minimumAmount.toLocaleString()}</p>}
      {availableTime && (
        <p>사용 가능 시간: {getAvailableTimeDescription(availableTime)}</p>
      )}
    </div>
  );
}

export default Coupon;
