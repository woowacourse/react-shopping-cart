export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount?: string | number) {
  if (amount == null) return "";
  return `${Number(amount).toLocaleString("ko-KR")}원`;
}

export function formatAvailableTime(time?: { start: string; end: string }) {
  if (!time) return "";

  const [sH] = time.start.split(":");
  const [eH] = time.end.split(":");

  const sHour = parseInt(sH, 10);
  const eHour = parseInt(eH, 10);

  const sPeriod = sHour < 12 ? "오전" : "오후";
  const ePeriod = eHour < 12 ? "오전" : "오후";

  const endLabel =
    sPeriod === ePeriod ? `${eHour}시까지` : `${ePeriod} ${eHour}시까지`;

  return `${sPeriod} ${sHour}시부터 ${endLabel}`;
}
