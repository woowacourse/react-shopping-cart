// Suspense 사용을 위한 promise 통합 객체를 만드는 함수
export const createPromise = <T>(promise: Promise<T>) => {
  let status = 'pending';
  let result: T | Error;

  let suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  return {
    read: () => {
      if (status === 'pending') throw suspender;
      else if (status === 'error') throw result;
      else return result as T; // status === 'success'
    },
  };
};
