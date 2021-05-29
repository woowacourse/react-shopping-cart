import React from 'react';
import * as Styled from './Snackbar.styles';

export interface Props {
  children: React.ReactNode;
  isShown: boolean;
  /** 밀리 초 단위로 입력해주십시오 */
  animationDuration: number;
}

const Snackbar = ({ children, isShown, animationDuration }: Props) => {
  return (
    <Styled.Snackbar isShown={isShown} animationDuration={animationDuration}>
      {children}
    </Styled.Snackbar>
  );
};

export default Snackbar;
