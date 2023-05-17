const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }

  return res.json();
};

export default fetcher;
