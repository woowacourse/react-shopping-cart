const fetchApi = async (url: string, option: any) => {
  try {
    const response = await fetch(url, option);

    if (!response.ok)
      throw new Error(`api 요청을 실패했습니다! status: ${response.status}`);

    return response;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`api 요청을 실패했습니다! error: ${error.message}`);
  }
};

export default fetchApi;
