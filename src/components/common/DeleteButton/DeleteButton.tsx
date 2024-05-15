import React, { ReactNode } from 'react';

import * as Styled from './DeleteButton.styled';

const DeleteButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }> = ({
  children,
  ...rest
}) => {
  return <Styled.DeleteButton {...rest}>{children}</Styled.DeleteButton>;
};

export default DeleteButton;
