import React from 'react';
import * as Styled from './Snackbar.styles';

export interface Props {
  children: React.ReactNode;
}

const Snackbar = ({ children }: Props) => {
  return <Styled.Snackbar>{children}</Styled.Snackbar>;
};

export default Snackbar;
