import { AvailableTime, CartItem } from '@appTypes/shoppingCart';

import { getHoursFromServerData, getNextMidnight } from './date';
/**
 * 현재가 쿠폰 만료 기간 이전인지 판단하는 함수로,
쿠폰은 만료기간 당일까지 가능하다.
 * @param expirationDate : 만료 기간
 */
export const isValidatedExpiration = (expirationDate: string) => {
  const today = new Date();
  const expirationNextDate = getNextMidnight(new Date(expirationDate));

  return today < expirationNextDate;
};

export const isOrderPriceAboveMinimum = (orderPrice: number, minOverPrice: number) => {
  return orderPrice >= minOverPrice;
};
/**
 * 선택된 상품 중, buyQuantity 이상의 수량을 가진 상품이 있는 지 여부
 * @param buyQuantity : 쿠폰 사용 조건인 상품 최저 수량
 * @param selectedItems : 선택된 상품들
 */
export const isValidatedBuyQuantity = (buyQuantity: number, selectedItems: CartItem[]) => {
  return selectedItems.some((item) => item.quantity >= buyQuantity);
};

export const isValidatedTime = ({ start, end }: AvailableTime) => {
  const currentHours = new Date().getHours();
  const startTime = getHoursFromServerData(start);
  const endTime = getHoursFromServerData(end);

  return currentHours >= startTime && currentHours < endTime;
};
