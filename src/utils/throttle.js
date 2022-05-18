const throttle = (time, cb) => {
  let timer;

  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        cb();
      }, time);
    }
  };
};

export default throttle;
