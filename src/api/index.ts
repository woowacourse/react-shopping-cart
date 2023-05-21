export const fetchApi = async (url: string, options: RequestInit) => {
  if (!navigator.onLine) {
    throw new Error('네트워크 연결이 끊어졌습니다.');
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('데이터를 가져오는데 오류가 발생했습니다.');
  }

  return response.json();
};
