import React from "react";

interface CouponAvailableTimeProps {
  availableTime: {
    start: string;
    end: string;
  };
}

const CouponAvailableTime = ({ availableTime }: CouponAvailableTimeProps) => {
  const { start, end } = availableTime;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const formatHour = (hour: number): string => {
    const formatting = hour >= 12 ? "오후" : "오전";
    if (hour > 12) return formatting + (hour - 12);
    return formatting + hour;
  };

  return (
    <div>
      사용 가능 시간 : {formatHour(startHour)}시 {startMinute}부터 {formatHour(endHour)}시 {endMinute}까지
    </div>
  );
};

export default CouponAvailableTime;
