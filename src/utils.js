export const printCommasToPrice = (price) => {
  price = price.toString();
  const pattern = /(-?\d+)(\d{3})/;

  while (pattern.test(price)) {
    price = price.replace(pattern, '$1,$2');
  }

  return price;
};
