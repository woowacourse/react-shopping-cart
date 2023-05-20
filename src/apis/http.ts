const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) throw new Error(`요청을 실패했습니다: ${url}`);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType === 'application/json') {
    return response.json();
  }
  return response;
};

export const get = async (url: string, options?: RequestInit) => {
  const response = fetcher(url, { ...options });

  return response;
};

export const post = async (url: string, options?: RequestInit) => {
  const response = fetcher(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  return response;
};

export const patch = async (url: string, options?: RequestInit) => {
  const response = fetcher(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  return response;
};

export const remove = async (url: string, options?: RequestInit) => {
  const response = fetcher(url, {
    method: 'DELETE',
    ...options,
  });

  return response;
};
