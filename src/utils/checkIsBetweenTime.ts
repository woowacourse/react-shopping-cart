const checkIsBetweenTime = (startHour: number, endHour: number) => {
  const now = new Date();
  const currentHour = now.getHours();

  return currentHour >= startHour && currentHour < endHour;
};

export default checkIsBetweenTime;
