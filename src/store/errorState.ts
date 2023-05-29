import { atom } from "recoil";
import { ErrorType } from "../types/error";

export const errorAtom = atom<ErrorType>({
  key: "error",
  default: {
    isError: false,
    method: "",
    message: "",
  },
});
