import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

const LayoutWithTitle = ({ title, children }) => {
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
  width: 1320px;
  ${flexCenter}
  flex-direction: column;
  color: ${({ theme }) => theme.colors.font};

  & > h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

const StyledDivider = styled.div`
  width: 100%;
  border-top: 4px solid ${({ theme }) => theme.colors.font};
`;
