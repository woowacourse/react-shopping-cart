import { useCallback } from "react"
import { useRecoilState } from "recoil"
import Toast, { ToastProps } from "src/components/@common/Toast"
import { toastAtom } from "src/recoil/toast"

const useToast = () =>{
    const [toasts,setToasts] = useRecoilState(toastAtom)

    const addToast = (toastState:ToastProps) => addToastCallback(toastState)

    const toastComponent = toasts.map(({type,message,id, show}) =>  <Toast key={id} id={id} type={type} message={message} show={show} />)

    const addToastCallback = useCallback((toastState:ToastProps) =>{
        setToasts((prev) => [...prev,toastState]);
        new Promise<void>((resolve) =>
            setTimeout(() =>{
                setToasts((prev) => prev.map((prev) => prev.id === toastState.id ? {...prev, show:false} : prev))
                resolve();
            },2000)
        ).then(() => {
            setTimeout(() =>
                setToasts(prev => prev.filter(({show}) => show))
            ,500)
        });
    },[toasts]);

    return {
        toastComponent,
        addToast
    }
}

export default useToast;