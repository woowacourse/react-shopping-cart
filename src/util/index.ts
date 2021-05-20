const numberWithCommas = (num: number | string): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export { numberWithCommas };
