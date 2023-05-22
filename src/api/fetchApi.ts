export const fetchApi = async (url: string, options: RequestInit) => {
  if (!navigator.onLine) throw new Error('[ERROR] 네트워크가 오프라인 상태입니다.');

  const response = await fetch(url, options);

  if (!response.ok) throw new Error('[ERROR] 에러가 발생하였습니다.');

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return response;
};
