const AMKoKR = '오전';
const FMKoKR = '오후';

const hourKoKR = '시';
const minuteKoKR = '분';

const getKoKRExcludePeriod = (minutes: number) => {
  const hour = Math.floor(minutes / 60) % 12 || 12;
  const restMinutes = minutes % 60;

  const hourString = `${hour}${hourKoKR}`;
  const minuteString = restMinutes > 0 ? ` ${restMinutes}${minuteKoKR}` : '';
  return `${hourString}${minuteString}`;
};

export default function getFromToMinutesKoKR(fromMinutes: number, toMinutes: number) {
  const fromExcludedPeriod = getKoKRExcludePeriod(fromMinutes);
  const toExcludedPeriod = getKoKRExcludePeriod(toMinutes);

  const isAMFrom = fromMinutes < 12 * 60;
  const isAMTo = toMinutes < 12 * 60;

  const fromHasPeriod = `${isAMFrom ? AMKoKR : FMKoKR} ${fromExcludedPeriod}`;

  const toHasPeriod = `${isAMTo ? AMKoKR : FMKoKR} ${toExcludedPeriod}`;
  const adjustedToKoKR = isAMTo === isAMFrom ? toExcludedPeriod : toHasPeriod;

  return { from: fromHasPeriod, to: adjustedToKoKR };
}
