import styled from 'styled-components';

import FlexCenterStyled from 'components/FlexWrapper/style';

export const ProductListStyled = styled.div(
  ({ theme }) => `
  height: calc(100% - ${theme.headerHeight});
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 5.5vh 14vw 0;
  overflow-y: auto;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`,
);

export const MessageWrapperStyled = styled(FlexCenterStyled)(
  ({ theme }) => `
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - ${theme.headerHeight});
`,
);
