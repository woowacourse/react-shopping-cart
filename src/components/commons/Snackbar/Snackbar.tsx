import React from 'react';
import * as Styled from './Snackbar.styles';

export interface Props {
  children: React.ReactNode;
  isShown: boolean;
  /** 밀리 초 단위로 입력해주십시오 */
  duration: number;
}

const Snackbar = ({ children, isShown, duration }: Props) => {
  return (
    <Styled.Snackbar isShown={isShown} duration={duration}>
      {children}
    </Styled.Snackbar>
  );
};

export default Snackbar;
