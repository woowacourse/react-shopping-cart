const fetchApi = async (url: string, option: RequestInit) => {
  const response = await fetch(url, option);
  if (!response.ok)
    throw new Error(`api 요청을 실패했습니다! status: ${response.status}`);

  return response
};

export default fetchApi;
