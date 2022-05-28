import styled from 'styled-components';
import FlexWrapperStyled from 'components/FlexWrapper/style';

export const HeaderStyled = styled.div(
  ({ theme }) => `
  height: ${theme.headerHeight};
  padding: 0 15.625vw;
  background-color: ${theme.mainColor};
`,
);

export const PageButtonContainerStyled = styled(FlexWrapperStyled)`
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
