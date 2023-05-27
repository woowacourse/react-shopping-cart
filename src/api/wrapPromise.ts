export default function wrapPromise<T>(promise: Promise<T>) {
  let status = "pending"; // 최초상태
  let result: T;

  let suspender = promise.then(
    (r) => {
      status = "success"; // 성공으로 완결시 success로
      result = r;
    },
    (e) => {
      status = "error"; // 실패로 완결시 error로
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
