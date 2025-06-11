type TimeString = `${number}:${number}:${number}`;

export const formatTime = (time: TimeString) => {
  return parseInt(time.split(':')[0]);
};
