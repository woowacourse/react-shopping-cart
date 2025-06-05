import { ZeroToNine } from "@/types";

type Hour = `0${ZeroToNine}` | `1${ZeroToNine}` | `2${0 | 1 | 2 | 3}`;

type Minute =
  | `0${ZeroToNine}`
  | `1${ZeroToNine}`
  | `2${ZeroToNine}`
  | `3${ZeroToNine}`
  | `4${ZeroToNine}`
  | `5${ZeroToNine}`;

type Second =
  | `0${ZeroToNine}`
  | `1${ZeroToNine}`
  | `2${ZeroToNine}`
  | `3${ZeroToNine}`
  | `4${ZeroToNine}`
  | `5${ZeroToNine}`;

export type Time = `${Hour}:${Minute}:${Second}`;
