export const isCouponExpired = (expirationDate: string): boolean => {
  const today = new Date();
  const expireDate = new Date(expirationDate);

  today.setHours(0, 0, 0, 0);
  expireDate.setHours(0, 0, 0, 0);

  return today > expireDate;
};

export const isUnavailableTime = (availableTime: {
  start: string;
  end: string;
}): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const startHour = parseInt(availableTime.start.split(":")[0], 10);
  const endHour = parseInt(availableTime.end.split(":")[0], 10);

  return currentHour < startHour || currentHour >= endHour;
};
