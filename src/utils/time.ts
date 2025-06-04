/**
 * 04:00:00
 * @param time
 * @returns 오전 4시
 */
export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const minute = parseInt(minutes) || 0;
  const ampm = hour >= 12 ? "오후" : "오전";
  const hour12 = hour % 12 || 12;
  return `${ampm} ${hour12}시 ${minute.toString().padStart(2, "0")}분`;
};

/**
 * 04:00:00
 * @param time
 * @returns {hour:number,minute:number,second:number}
 */
export const getTime = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);

  return {
    hour: hours,
    minute: minutes,
    second: seconds,
  };
};
