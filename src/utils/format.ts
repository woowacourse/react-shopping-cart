export const formatTimeRange = (timeRange: { start: string; end: string }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const minute = parseInt(minutes);
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour <= 12 ? hour : hour - 12;
    return `${period} ${displayHour}시${minute > 0 ? ` ${minute}분` : ''}`;
  };

  return `${formatTime(timeRange.start)}부터 ${formatTime(timeRange.end)}까지`;
};

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};
