export const fetchApi = async (url: string, options: RequestInit) => {
  if (!navigator.onLine) {
    throw new Error('네트워크 오프라인이 감지되었습니다');
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('api 요청 중에 오류가 발생했습니다.');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response;
};
