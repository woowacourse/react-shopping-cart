export const convertTime = (timeString: string) => {
  return timeString.split(':')[0];
};
export const isExpiredDate = (dateString: string) => {
  const today = new Date();
  const compareDate = new Date(dateString);

  return today > compareDate;
};

export const createDateTime = (dateString: string, formatType = ':') => {
  const [hour, minute, second] = dateString.split(formatType).map(Number);

  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);
};
