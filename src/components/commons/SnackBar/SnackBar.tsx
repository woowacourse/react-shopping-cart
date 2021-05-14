import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as Styled from './SnackBar.styles';

const $snackBar = document.querySelector('#snack-bar');

export interface Props {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SnackBar = ({ message, setMessage }: Props) => {
  useEffect(() => {
    const id = setTimeout(() => {
      setMessage('');
    }, 3000);
    return () => {
      setMessage('');
      clearTimeout(id);
    };
  }, []);

  if (!$snackBar) return null;
  return ReactDOM.createPortal(<Styled.SnackBar>{message}</Styled.SnackBar>, $snackBar);
};

export default SnackBar;
