import { ERROR_CODE } from "../constants/error";

export function getErrorMessageByCode(code: string) {
  return ERROR_CODE[code];
}
