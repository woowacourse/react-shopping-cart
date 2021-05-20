export const getFormattedAsKRW = (number) => {
  const numberWithCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${numberWithCommas} 원`;
};
