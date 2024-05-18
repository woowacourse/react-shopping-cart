const formatPriceToKoreanWon = (price: number) => {
  return `${price.toLocaleString()}원`;
};

export default formatPriceToKoreanWon;
