const checkIsOverToday = (year: number, month: number, day: number) => {
  const today = new Date();
  const givenDay = new Date(year, month - 1, day - 1, 23, 59, 59);

  return today < givenDay;
};

export default checkIsOverToday;
