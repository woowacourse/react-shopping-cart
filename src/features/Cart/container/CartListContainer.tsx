import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export const CartListContainer = ({ children }: PropsWithChildren) => {
  return <StyledCartListContainer>{children}</StyledCartListContainer>;
};

const StyledCartListContainer = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding: 0px 10px;
`;
