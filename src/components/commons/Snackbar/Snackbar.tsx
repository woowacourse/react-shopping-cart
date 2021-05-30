import React from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './Snackbar.styles';

export interface Props {
  children: React.ReactNode;
  isShown: boolean;
  /** 밀리 초 단위로 입력해주십시오 */
  animationDuration: number;
}

const SnackbarPortal = (children: React.ReactNode) => {
  const $snackbar = document.getElementById('snackbar');
  if (!$snackbar) throw Error('cannot find snackbar');

  return createPortal(children, $snackbar);
};

const Snackbar = ({ children, isShown, animationDuration }: Props) => {
  return SnackbarPortal(
    <Styled.Snackbar isShown={isShown} animationDuration={animationDuration}>
      {children}
    </Styled.Snackbar>
  );
};

export default Snackbar;
