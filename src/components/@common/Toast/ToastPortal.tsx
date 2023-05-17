import { createPortal } from "react-dom";
import { styled } from "styled-components";
import useToast from "src/hooks/useToast";

const ToastPortal = () =>{
    const portalRoot = document.getElementById('toast-root') as HTMLElement;
    const {toastComponent} = useToast()
    
    return createPortal(<ToastWrapper>
        {toastComponent}
    </ToastWrapper>,portalRoot ?? document.body)
}


export default ToastPortal;

const ToastWrapper = styled.div`
    position: fixed;
    bottom: 100px;
    left: 50%;

    display: flex;
    flex-direction: column;
    gap: 10px;
`