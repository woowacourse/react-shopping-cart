export const iso8601ToDate = (iso8601: string) => {
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/.test(iso8601))
    throw new Error('iso8601(yyyy-mm-dd)이 아님!');
  const [year, month, day] = iso8601.split('-').map(Number);
  return new Date(year, Number(month) - 1, day);
};

export const getHHColonMMtoMinutes = (hhColonMM: string) => {
  if (!/^\d{2}:\d{2}$/.test(hhColonMM)) throw new Error('hh:mm 형식이 아님!');
  const time = hhColonMM.split(':');
  return Number(time[0]) * 60 + Number(time[1]);
};
