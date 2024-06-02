const formatKoreanCurrency = (price: number) => {
  return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
};

export default formatKoreanCurrency;
