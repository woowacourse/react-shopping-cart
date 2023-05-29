import {
  ErrorCode,
  ERROR_CODE,
  ERROR_MESSAGE,
  ERROR_MESSAGE_FORMAT,
} from '../constants/errors';

interface ErrorInfo<T extends object = object> {
  code: unknown;
  payload?: T;
}

interface ErrorCause<T extends object = object> {
  code: keyof ErrorCode;
  value: unknown;
  payload?: T;
}
export interface ErrorOptions {
  cause?: ErrorCause;
}

export const isValidErrorCode = (code: unknown): code is keyof ErrorCode =>
  typeof code === 'string' &&
  Object.prototype.hasOwnProperty.call(ERROR_CODE, code);

const getValueByMessageType = (
  target: ERROR_MESSAGE_FORMAT,
  payload = {}
): ERROR_MESSAGE => (typeof target === 'function' ? target(payload) : target);

const errorMessageGenerator = ({ code, payload }: ErrorInfo): ERROR_MESSAGE =>
  isValidErrorCode(code)
    ? getValueByMessageType(ERROR_MESSAGE[code], payload)
    : ERROR_MESSAGE.UNEXPECTED_ERROR;

const errorOptionsGenerator = (
  { code, payload }: ErrorInfo,
  value: unknown
): ErrorOptions =>
  isValidErrorCode(code)
    ? { cause: { code, value, payload } }
    : { cause: { code: ERROR_CODE.UNEXPECTED_ERROR, value: code, payload } };

const createErrorParams = (
  info: ErrorInfo,
  value: unknown
): [ERROR_MESSAGE, ErrorOptions] => {
  const message = errorMessageGenerator(info);
  const options = errorOptionsGenerator(info, value);

  return [message, options];
};

export class CustomError extends Error {
  cause?: ErrorCause;

  constructor(info: ErrorInfo, value?: unknown) {
    const [message, options] = createErrorParams(info, value);

    super(message, options);

    this.cause = options.cause;
    this.name = isValidErrorCode(info.code)
      ? info.code
      : ERROR_CODE.UNEXPECTED_ERROR;
  }
}
