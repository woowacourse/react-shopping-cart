import { GlobalActionType } from '@/store/global/action';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Styled from './Snackbar.style';

const SnackBar = () => {
  const { isOpen, message, isSuccess } = useSelector((state: any) => state.global.snackbar);
  const dispatch = useDispatch();

  const ref = useRef<any>({
    element: null,
    timeout: null,
  });

  useEffect(() => {
    if (isOpen) {
      if (ref.current.timeout) {
        const [showAnimation] = ref.current.element.getAnimations();
        showAnimation.cancel();
        showAnimation.play();
        clearTimeout(ref.current.timeout);
      }

      ref.current.timeout = setTimeout(() => {
        dispatch({ type: GlobalActionType.CLOSE_SNACKBAR });
      }, 3000);
    }
  });

  return isOpen
    ? ReactDOM.createPortal(
        <Styled.SnackBar isSuccess={isSuccess} ref={el => (ref.current.element = el)}>
          <Styled.SnackBarMessage>{message}</Styled.SnackBarMessage>
        </Styled.SnackBar>,
        document.querySelector('#root') as Element,
      )
    : null;
};

export default SnackBar;
