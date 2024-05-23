export const dateFormat = (targetDate: Date) => {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const date = targetDate.getDate();

  return year + '년 ' + month + '월 ' + date + '일';
};

export const timeFormat = (targetTime: string, isPrefix: boolean) => {
  let formatTime = '';
  const [targetHours, targetMinutes, targetSeconds] = targetTime.split(':');

  if (isPrefix) {
    if (Number(targetHours) >= 12) formatTime += '오후 ';
    else formatTime += '오전 ';
  }

  formatTime += Number(targetHours) + '시';

  if (targetMinutes && Number(targetMinutes)) formatTime += ' ' + Number(targetMinutes) + '분';

  if (targetSeconds && Number(targetSeconds)) formatTime += ' ' + Number(targetSeconds) + '초';

  return formatTime;
};
