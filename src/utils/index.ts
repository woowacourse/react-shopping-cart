type Primitive = boolean | string | number;

export const isExistInList = <T extends Primitive>(list: T[], value: T) => {
  return list.indexOf(value) !== -1;
};

export const sum = (list: number[]) => {
  return list.reduce((acc, cur) => (acc += cur), 0);
};

export const debounce = (callback: any, time: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, time);
  };
};
