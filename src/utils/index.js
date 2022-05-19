const debounce = (f, time, timer) => () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(f, time);
};

export default debounce;
