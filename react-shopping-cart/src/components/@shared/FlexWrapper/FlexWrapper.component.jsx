import styled, { css } from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};

  ${({ isColumnDirection }) =>
    isColumnDirection &&
    css`
      flex-direction: column;
    `}
`;

export default FlexWrapper;
