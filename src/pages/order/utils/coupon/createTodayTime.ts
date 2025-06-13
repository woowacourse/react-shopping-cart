const createTodayTime = (time: string) => {
  const [h, m, s] = time.split(":").map(Number);
  const t = new Date();
  t.setHours(h, m, s, 0);
  return t;
};

export default createTodayTime;
