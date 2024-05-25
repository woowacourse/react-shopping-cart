const isTimeAM = (hour: number) => {
  return hour < 12;
};

const formatAvailableTime = ({ start, end }: { start: string; end: string }) => {
  const [startHour] = start.split(':').map(Number);
  const [endHour] = end.split(':').map(Number);

  const isStartTimeAM = isTimeAM(startHour);
  const isEndTimeAM = isTimeAM(endHour);

  if (isStartTimeAM && isStartTimeAM === isEndTimeAM) return `오전 ${startHour}시부터 ${endHour}시까지`;
  if (!isStartTimeAM && isStartTimeAM === isEndTimeAM) return `오후 ${startHour}시부터 ${endHour}시까지`;

  return `오전 ${startHour}시부터 오후 ${endHour}시까지`;
};

export default formatAvailableTime;
