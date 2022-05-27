import { ReactNode } from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

interface LayoutWithTitleProps {
  title: string;
  children: ReactNode;
}

const LayoutWithTitle = ({ title, children }: LayoutWithTitleProps) => {
  return (
    <StyledRoot>
      <h2>{title}</h2>
      <StyledDivider />
      {children}
    </StyledRoot>
  );
};

export default LayoutWithTitle;

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  ${flexCenter}
  flex-direction: column;
  color: ${({ theme }) => theme.colors.GRAY_333};

  & > h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }

  & > :nth-child(2) {
    margin-bottom: 4rem;
  }
`;

const StyledDivider = styled.div`
  width: 100%;
  border-top: 4px solid ${({ theme }) => theme.colors.GRAY_333};
`;
