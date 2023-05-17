import { useCallback } from "react"
import { useRecoilState } from "recoil"
import Toast, { ToastProps } from "src/components/@common/Toast"
import { toastAtom } from "src/recoil/toast"

const useToast = () =>{
    const [toasts,setToasts] = useRecoilState(toastAtom)

    const toast = {
        success:(message:string) => addToast({
            id: Number(Date.now()),
            message,
            type: "success"
        }),
        error :(message:string) => addToast({
            id: Number(Date.now()),
            message,
            type: "error"
        }),
    }

    const addToast = (toastState:ToastProps) => addToastCallback(toastState)
    
    const deleteToast = (id:number) => setToasts((prev)=> prev.filter(e => e.id !== id));

    const toastComponent = toasts.map(({type,message,id}) =>  <Toast key={id} id={id} type={type} message={message} />)

    const addToastCallback = useCallback((toastState:ToastProps) =>{
        setToasts((prev) => [...prev,toastState]);
    },[toasts]);

    return {
        toastComponent,
        toast,
        deleteToast
    }
}

export default useToast;