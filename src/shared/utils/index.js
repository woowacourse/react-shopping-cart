const numberWithCommas = num => `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export { numberWithCommas };
