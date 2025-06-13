import getKoreanAmPm from './getKoreanAmPm';

export const getAvailableTimeText = (availableTime: {
  start: string;
  end: string;
}) => {
  const { start, end } = availableTime;

  const [startH, startM] = start.split(':');
  const [endH, endM] = end.split(':');

  const startText = `${Number(startH)}시${
    startM === '00' ? '' : `${startM}분`
  }`;
  const endText = `${Number(endH)}시${endM === '00' ? '' : `${endM}분`}`;

  const startTimeZone = getKoreanAmPm(start);
  const endTimeZone =
    getKoreanAmPm(end) === startTimeZone ? '' : getKoreanAmPm(end);

  return `${startTimeZone} ${startText}부터 ${endTimeZone} ${endText}까지`;
};
