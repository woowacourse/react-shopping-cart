import styled, { css } from 'styled-components';

const FlexWrapperStyled = styled.div`
  ${({ flexFlow = 'row wrap', justifyContent = 'flex-start', alignItems = 'stretch' }) =>
    css`
      display: flex;
      flex-flow: ${flexFlow};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
    `}
`;

export default FlexWrapperStyled;
