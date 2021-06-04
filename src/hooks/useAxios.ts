import { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import api from '../api';
import { ApiMethod, AsyncStatus } from '../types';

interface IState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | any[] | null;
  status: AsyncStatus;
  error?: Error;
}

export default (
  url: string,
  { method = ApiMethod.GET } = {}
): [IState, (data?: Record<string, unknown> | Array<unknown>) => Promise<void>] => {
  const [state, setState] = useState<IState>({
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
        // eslint-disable-next-line no-console
        console.error(error);

        setState({ data: null, status: AsyncStatus.FAILURE, error });
      }
    },
    [method, url]
  );

  return [state, request];
};
