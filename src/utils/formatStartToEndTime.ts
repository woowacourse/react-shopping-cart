const formatStartToEndTime = (start: string, end: string) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours < 12 ? '오전' : '오후';
    const formattedHours = hours % 12 || 12;

    return minutes === 0
      ? `${period} ${formattedHours}시`
      : `${period} ${formattedHours}시 ${minutes}분`;
  };

  return `${formatTime(start)}부터 ${formatTime(end)}까지`;
};

export default formatStartToEndTime;
