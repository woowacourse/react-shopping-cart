import { BASE_URL, USER_TOKEN } from './env';

interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

export const apiClient = async <T = unknown>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> => {
  const { method = 'GET', body } = options;

  const config: RequestInit = {
    method,
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
      'content-type': 'application/json',
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // 204 No Content 응답의 경우 빈 응답 처리
  if (response.status === 204) {
    return {} as T;
  }

  // 응답 본문이 비어있는지 확인
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    console.error('JSON parsing error:', error);
    throw new Error('Invalid JSON response');
  }
};
