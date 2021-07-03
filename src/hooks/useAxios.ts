import { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import api from '../api';
import { ApiMethod, AsyncStatus } from '../types';

interface ApiResponse<T> {
  data: T | null;
  status: AsyncStatus;
  error?: Error;
  errorMessage?: string;
}

export default <T>(
  url: string,
  { method = ApiMethod.GET } = {}
): [ApiResponse<T>, (data?: Record<string, unknown> | Array<unknown>) => Promise<void>] => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    status: AsyncStatus.IDLE,
  });

  const request = useCallback(
    async (data) => {
      setState((prevState) => ({ ...prevState, status: AsyncStatus.PENDING }));

      const options: AxiosRequestConfig = {
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.data = JSON.stringify(data);
      }

      try {
        const response = await api(options);

        setState({ data: response.data, status: AsyncStatus.SUCCESS });
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: error.response.data,
          status: AsyncStatus.FAILURE,
          error,
        }));
      }
    },
    [method, url]
  );

  return [state, request];
};
