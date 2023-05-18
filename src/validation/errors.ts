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

interface ErrorOptions {
  cause?: unknown;
}

export const isValidErrorCode = (code: unknown): code is keyof ErrorCode =>
  typeof code === 'string' &&
  Object.prototype.hasOwnProperty.call(ERROR_CODE, code);

const getValueByMessageType = (
  target: ERROR_MESSAGE_FORMAT,
  payload = {}
): ERROR_MESSAGE => (typeof target === 'function' ? target(payload) : target);

const errorMessageGenerator = (code: unknown, payload = {}): ERROR_MESSAGE =>
  isValidErrorCode(code)
    ? getValueByMessageType(ERROR_MESSAGE[code], payload)
    : ERROR_MESSAGE.UNEXPECTED_ERROR;

const errorOptionsGenerator = (code: unknown, value: unknown) =>
  isValidErrorCode(code)
    ? { cause: { code, value } }
    : { cause: { code: ERROR_CODE.UNEXPECTED_ERROR, value: code } };

const createErrorParams = (
  { code, payload }: ErrorInfo,
  value: unknown
): [string, ErrorOptions] => {
  const message = errorMessageGenerator(code, payload);
  const options = errorOptionsGenerator(code, value);

  return [message, options];
};

export class CustomError extends Error {
  constructor(info: ErrorInfo, value?: unknown) {
    super(...createErrorParams(info, value));

    this.name = isValidErrorCode(info.code)
      ? info.code
      : ERROR_CODE.UNEXPECTED_ERROR;
  }
}
