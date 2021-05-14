import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as Styled from './SnackBar.styles';

const $snackBar = document.querySelector('#snack-bar');

export interface Props {
  message: string;
  setMessage: (message: string) => void;
}

const SnackBar = (() => {
  let timer: NodeJS.Timer | null;

  return ({ message, setMessage }: Props) => {
    useEffect(() => {
      return () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
    }, []);

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    if (!$snackBar || !message) return null;
    return ReactDOM.createPortal(<Styled.SnackBar>{message}</Styled.SnackBar>, $snackBar);
  };
})();

export default SnackBar;
