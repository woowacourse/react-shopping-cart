import { useEffect } from 'react';

// 전역 카운터로 여러 컴포넌트의 스크롤 잠금 요청 추적
let blockingInstances = 0;

const useScrollBlock = (active: boolean = true) => {
  useEffect(() => {
    if (!active) return;

    // 스크롤바 너비를 고려하여 레이아웃 이동 방지
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    blockingInstances++;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      blockingInstances--;
      // 다른 컴포넌트가 여전히 스크롤을 차단 중인지 확인
      if (blockingInstances === 0) {
        document.body.style.overflow = originalStyle || '';
        document.body.style.paddingRight = originalPaddingRight || '';
      }
    };
  }, [active]);
};

export default useScrollBlock;
