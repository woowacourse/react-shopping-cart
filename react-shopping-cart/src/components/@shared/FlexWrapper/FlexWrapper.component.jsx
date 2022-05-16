import styled, { css } from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isColumnDirection }) =>
    isColumnDirection &&
    css`
      flex-direction: column;
    `}

  ${({ style }) => style}
`;

export default FlexWrapper;
