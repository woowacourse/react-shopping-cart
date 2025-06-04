export const splitTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
};

export const decideHourPeriod = (hour: number) => {
  return hour < 12 ? "오전" : "오후";
};
