import { atom } from "recoil";
import { ToastProps } from "src/components/@common/Toast";

export const toastAtom = atom<ToastProps[]>({
    key:"toastAtom",
    default:[]
})