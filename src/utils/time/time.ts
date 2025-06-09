export const isInAvailableTimeRange = ({ start, end }: { start: string; end: string }) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
};

export const isExpired = (expirationDate: string) => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  return now > expiration;
};
