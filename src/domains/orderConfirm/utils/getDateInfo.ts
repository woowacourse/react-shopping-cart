const getHours = (time: string) => {
  return Number(time.split(":")[0]);
};

const getMinutes = (time: string) => {
  return Number(time.split(":")[1]);
};

const formatToKoreanAmPm = (time: string) => {
  const hour = getHours(time);

  const isAM = hour < 12;
  const period = isAM ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${hour12}시`;
};

function getTimeInMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getNowInMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export {
  getHours,
  getMinutes,
  formatToKoreanAmPm,
  getTimeInMinutes,
  getNowInMinutes,
};
