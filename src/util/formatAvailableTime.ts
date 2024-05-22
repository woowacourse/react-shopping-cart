import { AvailableTime } from "../types";

const formatAvailableTime = (availableTime: AvailableTime): string => {
  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}시`;
  };

  return `${formatTime(availableTime.start)}부터 ${formatTime(availableTime.end)}까지`;
};

export default formatAvailableTime;
