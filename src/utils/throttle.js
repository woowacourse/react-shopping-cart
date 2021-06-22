export const throttle = (func, delayInMicroSecond) => {
  let timerId;

  return () => {
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = null;
        func();
      }, delayInMicroSecond);
    }
  };
};
