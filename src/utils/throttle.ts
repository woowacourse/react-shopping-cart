const throttle = (time: number, cb: () => void) => {
  let timer: any;

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
