export const fetchApi = async (url: string, options: RequestInit) => {
  try {
    if (!navigator.onLine) throw new Error('[ERROR] 네트워크 오프라인이 감지되었습니다.');

    const response = await fetch(url, options);
    if (!response.ok) {
      throw Error(
        `[ERROR] api 요청 중 오류가 발생했습니다. 다시 시도해주세요. (status: ${response.status})`
      );
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType === 'application/json') return await response.json();

    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
