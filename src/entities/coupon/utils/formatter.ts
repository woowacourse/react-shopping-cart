export const formatTime = (timeString: string) => {
  return Number(timeString.split(':')[0]);
};

export const formatAvailableTime = (start: number, end: number) => {
  if (start < 12) {
    if (end < 12) {
      return `오전 ${start}시부터 ${end}시까지`;
    } else {
      return `오전 ${start}시부터 오후 ${end - 12}시까지`;
    }
  } else {
    if (end < 12) {
      return `오후 ${start - 12}시부터 ${end}시까지`;
    } else {
      return `오후 ${start - 12}시부터 오전 ${end}시까지`;
    }
  }
};
