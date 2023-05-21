export const fetchAPI = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `${response.status}: ${response.text} 오류가 발생했습니다.`
    );
  }

  return response.json();
};
