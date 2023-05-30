export const waitTimeout = (callback: () => void, delay: number) =>
  new Promise((resolve) => {
    const timerId = setTimeout(() => {
      callback();
      resolve(timerId);
    }, delay);
  });
