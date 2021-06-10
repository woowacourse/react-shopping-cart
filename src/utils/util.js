export const formatPrice = (price) => {
  if (typeof price !== "number") {
    throw new TypeError(
      `formatNumber의 인수는 숫자 타입이어야 합니다: ${price}`
    );
  }

  return price.toLocaleString("en-US");
};
