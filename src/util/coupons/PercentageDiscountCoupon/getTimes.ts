export const getTimes = (time: string) => {
  const [hour, min, sec] = time.split(":").map(Number);
  return { hour, min, sec };
};
