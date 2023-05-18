const BASE_URL = ``;

const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`데이터 요청에 실패했습니다. 요청 URL: ${url}`);
  }

  return response.json();
};

export default fetcher;
