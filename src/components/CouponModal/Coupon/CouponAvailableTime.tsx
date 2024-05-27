interface CouponAvailableTimeProps {
  availableTime: {
    start: string;
    end: string;
  };
}

const TIME_AM_LABEL = "오전";
const TIME_PM_LABEL = "오후";

const CouponAvailableTime = ({ availableTime }: CouponAvailableTimeProps) => {
  const { start, end } = availableTime;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const formatHour = (hour: number): string => {
    const formatting = hour >= 12 ? TIME_PM_LABEL : TIME_AM_LABEL;
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
