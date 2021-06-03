export const debounce = (callback, delay) => {
  let timer;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => callback(), delay);
  };
};
