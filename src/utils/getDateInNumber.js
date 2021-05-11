export const getDateInNumber = () => {
  const date = new Date();
  const YYYY = date.getFullYear().toString();
  const MM = date.getMonth().toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');

  return `${YYYY}${MM}${DD}${hh}${mm}${ss}`;
};
