import { ZeroToNine } from "@/types";

type Year = `202${5 | 6 | 7 | 8 | 9}` | `203${ZeroToNine}`;

type Month = `0${ZeroToNine}` | `1${1 | 2}`;

type Day = `0${ZeroToNine}` | `1${ZeroToNine}` | `2${ZeroToNine}` | `3${0 | 1}`;

export type Date = `${Year}-${Month}-${Day}`;
