export function formatTime(start: string, end: string): string {
  const parseTime = (time: string) => {
    const m = time.match(/^(\d{2}):(\d{2}):(\d{2})$/);
    if (!m) {
      throw new Error(`Invalid time format: "${time}". Expected "HH:mm:ss".`);
    }
    const hour24 = parseInt(m[1], 10);
    const minute = parseInt(m[2], 10);

    const period = hour24 < 12 ? '오전' : '오후';

    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    return { period, hour12, minute };
  };

  const s = parseTime(start);
  const e = parseTime(end);

  const startText = `${s.period} ${s.hour12}시` + (s.minute > 0 ? ` ${s.minute}분` : '');

  const endPrefix = s.period === e.period ? '' : `${e.period} `;
  const endText = `${endPrefix}${e.hour12}시` + (e.minute > 0 ? ` ${e.minute}분` : '');

  return `${startText}부터 ${endText}까지`;
}
