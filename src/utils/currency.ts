export function formatKoreanCurrency(price: number) {
  const formattedPrice = price.toLocaleString('ko-KR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  });

  return formattedPrice + '원';
}
