/**
 *
 * 쿠폰 만료기간이 지났는지 확인하는 함수
 * 만료기간이 지나면 true return
 */
export function isDatePassed(inputDateString: string) {
  const inputDate = new Date(inputDateString);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  return inputDate < currentDate;
}
