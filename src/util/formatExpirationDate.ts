const formatExpirationDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("ko", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [{ value: year }, , { value: month }, , { value: day }] =
    formatter.formatToParts(date);
  return `${year}년 ${month}월 ${day}일`;
};

export default formatExpirationDate;
