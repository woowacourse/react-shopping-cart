export const formatTimeToKorean = (timeStr: string) => {
  const [hh, mm] = timeStr.split(':').map((v) => parseInt(v, 10));
  const isAM = hh < 12;
  const period = isAM ? '오전' : '오후';

  let hour12 = hh % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }

  const minutePart = mm > 0 ? ` ${mm}분` : '';

  return `${period} ${hour12}시${minutePart}`;
};

export const convertTimeToSecond = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const formatAvailableTime = (avail: { start: string; end: string }) => {
  const startKorean = formatTimeToKorean(avail.start);
  const endKorean = formatTimeToKorean(avail.end);

  return `${startKorean}부터 ${endKorean}까지`;
};
