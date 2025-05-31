type Status = 'pending' | 'success' | 'error';

export const createResource = <T>(promise: Promise<T>) => {
  let status: Status = 'pending';
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw response;
      return response;
    },
  };
};
