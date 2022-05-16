import styled, { css } from 'styled-components';

const FlexWrapperStyled = styled.div`
  ${({
    flexFlow = 'row wrap',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    alignContent = 'flex-start',
  }) =>
    css`
      display: flex;
      flex-flow: ${flexFlow};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      align-content: ${alignContent};
    `}
`;

export default FlexWrapperStyled;
