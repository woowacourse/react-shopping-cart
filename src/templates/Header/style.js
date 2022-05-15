import styled from 'styled-components';

import FlexSpaceBetweenStyled from 'components/FlexWrapper/FlexSpaceBetween/style';

export const HeaderStyled = styled.div(
  ({ theme }) => `
  height: ${theme.headerHeight};
  padding: 0 15.625vw;
  background-color: ${theme.headerBackgroundColor};
`,
);

export const PageButtonContainerStyled = styled(FlexSpaceBetweenStyled)`
  height: 100%;
`;
