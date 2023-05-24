export const getLocalStorage = <T>(
  key: string,
  initialData: T
): {
  data: T;
  error: {
    isError: boolean;
    message: string;
  };
} => {
  try {
    const data = localStorage.getItem(key);

    if (data === null) {
      throw Error(`${key}값을 가진 데이터가 존재하지 않습니다.`);
    }

    return {
      data: JSON.parse(data),
      error: {
        isError: false,
        message: '',
      },
    };
  } catch (error) {
    if (!(error instanceof Error))
      return {
        data: initialData,
        error: {
          isError: false,
          message: '',
        },
      };

    return {
      data: initialData,
      error: {
        isError: true,
        message: error.message,
      },
    };
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
