export type CurrentTime = {
  currentYear: number;
  currentMonth: number;
  currentDate: number;
  currentHour: number;
};

const getCurrentTime = (): CurrentTime => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hours = now.getHours();

  return {
    currentYear: year,
    currentMonth: month,
    currentDate: date,
    currentHour: hours,
  };
};

export default getCurrentTime;
