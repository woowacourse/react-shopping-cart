const getPriceFormat = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default getPriceFormat;
