const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const formatTime = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const period = hours < 12 ? '오전' : '오후';
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  const formattedMinutes = minutes ? `${minutes}분` : '';
  const formattedSeconds = seconds ? `${seconds}초` : '';

  return `${period} ${adjustedHours}시${formattedMinutes}${formattedSeconds}`;
};

const formatAvailableTime = (start: string, end: string) => {
  const formattedStart = formatTime(start);
  const formattedEnd = formatTime(end);
  return formattedStart + ' ' + formattedEnd;
};

export { formatDate, formatAvailableTime };
