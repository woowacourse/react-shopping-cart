import { ERROR_CODE } from '../constants/errors';
import { CustomError } from '../validation/errors';

export interface WaitForOptions<T> {
  onSuccess?(data: T): void;
  onError?(error: unknown): void;
}
export interface WaitForMutationOptions<T, P> {
  onSuccess?(param: P, data: T): void;
  onError?(error: unknown): void;
}

export const waitFor = async <T>(
  promise: Promise<T>,
  options?: WaitForOptions<T>
): Promise<T> => {
  try {
    const data = await promise;
    options?.onSuccess?.(data);

    return data;
  } catch (error) {
    options?.onError?.(error);

    throw new CustomError({ code: ERROR_CODE.UNEXPECTED_ERROR });
  }
};

export const waitForMutation =
  <T, P = void>(
    promise: (param: P) => Promise<T>,
    options?: WaitForMutationOptions<T, P>
  ) =>
  (param: P) =>
    waitFor(promise(param), {
      ...options,
      onSuccess: options?.onSuccess?.bind(options.onSuccess, param),
    });
