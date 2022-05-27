export const debounce = (callback, delay: number) => {
  let timer: NodeJS.Timeout | null;

  return event => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay, event);
  };
};
