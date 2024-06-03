const formatExpirationDate = (expirationDate: string) => {
  const [year, month, day] = expirationDate.split('-').map(Number);

  return `${year}년 ${month}월 ${day}일`;
};

export default formatExpirationDate;
