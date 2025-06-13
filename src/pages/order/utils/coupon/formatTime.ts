const formatTime = (time: string) => {
  const [hour] = time.split(":").map(Number);
  const period = hour < 12 ? "오전" : "오후";
  const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${period} ${formattedHour}시`;
};

export default formatTime;
