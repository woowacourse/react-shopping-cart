import React from 'react';
import Styled from './Snackbar.styles';

type SnackbarProps = {
  message: string;
  isShowing: boolean;
};

const Snackbar = (props: SnackbarProps) => {
  const { message, isShowing } = props;

  return (
    <Styled.Root>
      <Styled.SnackbarInner isShowing={isShowing}>{message}</Styled.SnackbarInner>
    </Styled.Root>
  );
};

export default Snackbar;
