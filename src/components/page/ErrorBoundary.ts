import { ReactNode, useEffect } from 'react';

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const captureReject = (event: PromiseRejectionEvent) => {
    event.preventDefault();

    if (event.reason instanceof Error) {
      window.alert('네트워크가 불안정합니다.\n다시 시도해주세요.');
      return;
    }

    console.log('처리하지 못한 비동기 오류입니다.');
  };

  useEffect(() => {
    window.addEventListener('unhandledrejection', captureReject);
    return () => {
      window.removeEventListener('unhandledrejection', captureReject);
    };
  }, []);

  return children;
}
