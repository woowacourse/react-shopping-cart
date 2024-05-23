export const isValidDate = (date: string) => {
  const today = new Date();
  const targetDay = new Date(date);
  return today <= targetDay;
};

export const isInTimeRange = (startTime: string, endTime: string) => {
  // 현재 시간을 가져옵니다.
  const now = new Date();

  // 오늘 날짜에 start와 end 시간을 추가합니다.
  const [startHour, startMinute, startSecond] = startTime.split(":").map(Number);
  const [endHour, endMinute, endSecond] = endTime.split(":").map(Number);

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startHour,
    startMinute,
    startSecond
  );
  const endDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endHour,
    endMinute,
    endSecond
  );

  // 현재 시간이 start와 end 사이에 있는지 확인합니다.
  return startDate <= now && now <= endDate;
};
