export const formatExpirationDate = (input: string): string => {
  const date = new Date(input);

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedExpirationDate = formatter.format(date);

  return `만료일: ${formattedExpirationDate}`;
};

export const formatMinimumAmount = (amount: number): string => {
  const formattedAmount = amount.toLocaleString('ko-KR');

  return `최소 주문 금액: ${formattedAmount}원`;
};
