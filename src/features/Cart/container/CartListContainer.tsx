import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export const CartListContainer = ({ children }: PropsWithChildren) => {
  return <StyledCartListContainer>{children}</StyledCartListContainer>;
};

const StyledCartListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 250px;
  overflow-y: auto;
  padding: 0px 20px;
  flex: 2;
`;
