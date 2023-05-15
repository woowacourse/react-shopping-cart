export const waitTimeout = (callback: () => void, delay: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      callback();
      resolve(delay);
    }, delay)
  );
