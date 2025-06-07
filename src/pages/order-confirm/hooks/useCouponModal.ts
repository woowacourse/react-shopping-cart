import useBooleanState from "@/shared/hooks/useBooleanState";

export const useCouponModal = () => {
  const [isOpen, open, close] = useBooleanState(false);
  return [isOpen, open, close] as const;
};
