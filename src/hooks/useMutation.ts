import { FETCH_METHOD, MESSAGE } from '../constants';
import { MutationFetchMethod } from '../types';

interface UseMutationArg<ResponseData> {
  onSuccess?: (data?: { response: ResponseData | string; headers: Headers }) => void;
  onFailure?: (error?: string) => void;
  onSettled?: () => void;
}

const useMutation = <BodyData, ResponseData>({ onSuccess, onFailure, onSettled }: UseMutationArg<ResponseData>) => {
  const mutateQuery = async (fetchInformation: {
    url: string;
    method: MutationFetchMethod;
    bodyData?: BodyData;
    headers?: HeadersInit;
  }) => {
    const { url, method, bodyData, headers } = fetchInformation;

    const body = bodyData ? JSON.stringify(bodyData) : null;

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(MESSAGE.RESPONSE_NOT_OKAY);
      }

      if (method === FETCH_METHOD.DELETE || FETCH_METHOD.PATCH) {
        const data = await response.text();
        onSuccess?.({ response: data, headers: response.headers });
      } else {
        const data: ResponseData = await response.json();
        onSuccess?.({ response: data, headers: response.headers });
      }
    } catch (e) {
      if (e instanceof Error) {
        onFailure?.(e.message);
      }
    } finally {
      onSettled?.();
    }
  };

  return mutateQuery;
};
export default useMutation;
