export const fetcher = async <T>(
	url: string,
	options?: RequestInit
): Promise<T | null> => {
	const response = await fetch(url, options);
	if (!response.ok) throw new Error('서버 요청에 실패했습니다');

	if (options.method === 'GET') {
		const data = await response.json();
		return data;
	}

	return null;
};
