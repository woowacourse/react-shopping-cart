import formatKoreanCurrency from '../utils/formatKoreanCurrency';
import { CART_POLICY } from './cart';

export const NOTICE_MESSAGE = {
  shipping: `총 주문 금액이 ${formatKoreanCurrency(
    CART_POLICY.shipping_throughput,
  )}원 이상일 경우 무료 배송됩니다.`,
  min_quantity: '1개 이상의 수량을 선택해주세요.',
};
