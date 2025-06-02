interface ApiRequestProps {
  url: string;
  method: string;
  body?: string;
}

export const apiRequest = async <T>({
  url,
  method,
  body,
}: ApiRequestProps): Promise<T> => {
  const response = await fetch(url, {
    method,
    body,
  });

  validateResponse(response);

  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  }

  return response as T;
};

const validateResponse = (response: Response) => {
  if (!response.ok) {
    let errorMessage: string;

    if (response.status === 401) {
      errorMessage = '인증에 실패했습니다. 다시 시도해주세요.';
    } else if (response.status === 404) {
      errorMessage = '요청한 페이지(데이터)를 찾을 수 없습니다.';
    } else if (response.status === 500) {
      errorMessage = '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    } else {
      errorMessage = response.statusText;
    }

    throw new Error(errorMessage);
  }
};
