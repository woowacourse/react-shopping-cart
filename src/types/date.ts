/**
 * @example "07:00:00"
 */
export type TimeString = `${Hour}:${MinuteOrSecond}:${MinuteOrSecond}`;
/**
 * @example "2024-05-21"
 */
export type DateString = `${Year}-${Month}-${Day}`;

type OneDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type OneDigitExceptZero = Exclude<OneDigit, "0">;

type Hour = `${0 | 1}${OneDigit}` | `2${0 | 1 | 2 | 3}`;
type MinuteOrSecond = `${0 | 1 | 2 | 3 | 4 | 5}${OneDigit}`;

type Year = `${number}${number}${number}${number}`;
type Month = `${0}${OneDigitExceptZero}` | `1${0 | 1 | 2}`;
type Day = `${0}${OneDigitExceptZero}` | `${1 | 2}${OneDigit}` | `3${0 | 1}`;
