export const splitTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
};

export const convertTo12Hour = (hour: number) => {
  return hour < 12
    ? { period: "오전", hour }
    : { period: "오후", hour: hour - 12 };
};

export const formatTime = ({
  hour,
  minute,
}: {
  hour: number;
  minute: number;
}) => {
  return minute !== 0 ? `${hour}시 ${minute}분` : `${hour}시`;
};
