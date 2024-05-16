export function formatCurrency(value: number): string {
  return value.toLocaleString("ko-KR", { style: "currency", currency: "KRW" }).replace("₩", "") + "원";
}
