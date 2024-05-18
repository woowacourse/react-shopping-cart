import { API_URL, USER_ID, USER_PASSWORD } from '@/api/config';

import { generateBasicToken } from '@/utils/auth';

interface Props {
  url: string;
  options: RequestInit;
}

const apiFetch = ({ url, options }: Props) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
  });
};

export default apiFetch;
