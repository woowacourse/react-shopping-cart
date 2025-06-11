import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface UsePageStateGuardOptions {
  isValid: boolean;
  redirectTo?: string;
  message?: string;
}

export function usePageStateGuard({
  isValid,
  redirectTo,
  message = '비정상적인 접근입니다. 이전 페이지로 이동하시겠습니까?'
}: UsePageStateGuardOptions) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValid) {
      if (confirm(message)) {
        redirectTo ? navigate(redirectTo) : navigate(-1);
      }
    }
  }, [isValid, message, navigate, redirectTo]);
}
