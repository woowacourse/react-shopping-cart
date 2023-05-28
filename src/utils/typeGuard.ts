import { HTTP_ERROR_MESSAGE } from '../constants/api';
import { HTTPErrorMessageCode } from '../types/api';

function isHTTPErrorMessageCodeType(value: any): value is HTTPErrorMessageCode {
  return Object.keys(HTTP_ERROR_MESSAGE).includes(value);
}

export { isHTTPErrorMessageCodeType };
