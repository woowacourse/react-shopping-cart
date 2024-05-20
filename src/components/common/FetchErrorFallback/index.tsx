import { FallbackProps } from 'react-error-boundary';
import { ErrorMessage, FallbackContainer, StatusCode } from './style';

type StatusCode = '400' | '401' | '403' | '404' | '500';

const ERRORS: Record<StatusCode, string> = {
  '400': '요청이 잘못되었습니다. \n 입력하신 정보를 확인해주세요.',
  '401': '접근 권한이 없습니다. \n 로그인 상태를 확인해주세요.',
  '403': '접근이 거부되었습니다. \n 접근 권한이 없습니다.',
  '404': '요청하신 페이지를 찾을 수 없습니다. \n 주소가 정확한지 확인해주세요.',
  '500': '일시적으로 서버에 문제가 발생했습니다. \n 잠시 후 다시 시도해주세요.',
} as const;

export default function FetchErrorFallback({ error }: FallbackProps) {
  const statusCode = error.message as StatusCode;
  const message = ERRORS[statusCode] ?? 'Oops! Something went wrong 🫣';

  return (
    <FallbackContainer>
      <StatusCode>{statusCode}</StatusCode>
      <ErrorMessage>{message}</ErrorMessage>
    </FallbackContainer>
  );
}
