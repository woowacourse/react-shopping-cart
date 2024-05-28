export const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");

  return `${year}년 ${month}월 ${day}일`;
};

const parseTime = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const period = hours < 12 ? "오전" : "오후";
  const adjustedHours = hours % 12 || 12;

  return `${period} ${adjustedHours}시`;
};

export const parseAvailableTime = (availableTime: {
  start: string;
  end: string;
}) => {
  const { start, end } = availableTime;
  return `${parseTime(start)}부터 ${parseTime(end)}까지`;
};
