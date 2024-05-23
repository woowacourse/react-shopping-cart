const formatDateToKorea = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);

  return `${year}년 ${month}월 ${day}일`;
};

export default formatDateToKorea;
