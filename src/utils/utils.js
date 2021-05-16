/* eslint-disable import/prefer-default-export */
export const formatPrice = (price) => {
  if (typeof price !== "number") {
    throw new TypeError(
      `formatNumber의 인수는 숫자 타입이어야 합니다: ${price}`
    );
  }

  return price.toLocaleString("en-US");
};

export const debounce = (callback, delay = 1000) => {
  if (typeof callback !== "function") {
    throw new TypeError("debounce 함수의 첫번째 인자는 함수여야 합니다");
  }

  let id = null;

  return (...args) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => callback(...args), delay);
  };
};
