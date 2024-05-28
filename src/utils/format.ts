export const formatExpirationDate = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${year}년 ${month}월 ${day}일`;
};

export const formatAvailableTime = (time: string) => {
  const [hours] = time.split(':').map(Number);

  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${period} ${formattedHours}시`;
};
