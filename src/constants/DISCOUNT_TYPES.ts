export const DISCOUNT_TYPES = {
  fixed: 'fixed',
  buyXgetY: 'buyXgetY',
  freeShipping: 'freeShipping',
  percentage: 'percentage',
} as const;

// fixed: discount에 저장된 값만큼 할인
//  buyXgetY: X개 이상 담긴 상품 중 가장 비싼 상품의 Y개 가격만큼 할인
// freeShipping: 배송비 무료
// percentage: discount에 저장된 값을 퍼센테이지로 할인 (ex: discount == 30이면 30%만큼을 반올림하여 할인)
