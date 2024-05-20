import { HTTP_ERROR_MESSAGE } from '@constants/http';

import * as Styled from './ErrorFallback.styled';

export const hasKeyInObject = <T extends object>(obj: T, key: string | number | symbol): key is keyof T => {
  return key in obj;
};

export interface ErrorProps {
  statusCode: number;
  onResetError?: () => void;
}

const ErrorFallback = ({ statusCode, onResetError }: ErrorProps) => {
  const isHTTPError = hasKeyInObject(HTTP_ERROR_MESSAGE, statusCode);

  if (!isHTTPError) return null;

  return (
    <Styled.ErrorFallbackWrapper>
      <Styled.ErrorFallbackTitle>{HTTP_ERROR_MESSAGE[statusCode].body}</Styled.ErrorFallbackTitle>
      <Styled.ErrorFallbackButton onClick={onResetError}>
        {HTTP_ERROR_MESSAGE[statusCode].button}
      </Styled.ErrorFallbackButton>
    </Styled.ErrorFallbackWrapper>
  );
};

export default ErrorFallback;
