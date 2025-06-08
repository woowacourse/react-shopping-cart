import useBooleanState from "@/shared/hooks/useBooleanState";

/**
 * 쿠폰 적용 모달의 열림/닫힘 상태를 관리하는 커스텀 훅
 *
 * @returns {readonly [boolean, () => void, () => void]}
 *  - [0] isOpen: 모달 표시 여부
 *  - [1] open: 모달 열기 함수
 *  - [2] close: 모달 닫기 함수
 */
export const useCouponModal = () => {
  const [isOpen, open, close] = useBooleanState(false);
  return [isOpen, open, close] as const;
};
