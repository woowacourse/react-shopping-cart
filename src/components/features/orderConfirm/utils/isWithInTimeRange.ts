export function isWithinTimeRange(start: string, end: string): boolean {
  const now = new Date();
  const [startH, startM, startS] = start.split(':').map(Number);
  const [endH, endM, endS] = end.split(':').map(Number);

  const nowSec =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const startSec = startH * 3600 + startM * 60 + startS;
  const endSec = endH * 3600 + endM * 60 + endS;

  return nowSec >= startSec && nowSec < endSec;
}
