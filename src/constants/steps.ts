export const steps = ["구매품 선택", "쿠폰 적용 및 결제"];
export type StepName = (typeof steps)[number];
export const STEP_NAME = {
  SELECT_PRODUCT: "구매품 선택",
  APPLY_COUPON_AND_PAYMENT: "쿠폰 적용 및 결제",
} as const;
