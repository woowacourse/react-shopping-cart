import { useCallback, useState } from 'react';

interface Error {
  statusCode: number;
  payload?: any;
}

interface UseMutationState {
  loading: boolean;
  data?: any;
  error?: Error;
}

interface Headers {
  [key: string]: string;
}

export enum FETCH_METHOD {
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const useMutation = (method: FETCH_METHOD, headers: Headers) => {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
  });

  const { loading, data, error } = state;

  const mutation = useCallback(
    async (url: string, bodyData?: object) => {
      setState({ loading: true });

      try {
        const response = await fetch(url, {
          method,
          ...(headers && { headers }),
          ...(bodyData && { body: JSON.stringify(bodyData) }),
        });

        if (!response.ok) {
          setState((prev) => ({
            ...prev,
            error: {
              statusCode: 501,
              payload: {
                message: '서버에 알 수 없는 에러가 발생했습니다',
              },
            },
          }));
        }

        const location = response.headers.get('location');

        setState((prev) => ({
          ...prev,
          data: {
            ...(location && { location }),
          },
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [method]
  );

  return { mutation, loading, data, error };
};
