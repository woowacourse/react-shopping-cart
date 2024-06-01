const formatTime = (time: string) => {
  const [hour, minute, second] = time.split(':').map(Number);
  const amOrPm = hour < 12 ? '오전' : '오후';
  const hourOfTime12 = Number(hour) % 12;
  return { amOrPm, hourOfTime12, minute, second };
};
export default formatTime;
