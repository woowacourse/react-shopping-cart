import styled from 'styled-components';

import { ColumnFlexWrapper } from 'styles/Wrapper';

//재사용X
function ExpectedPaymentBottomContainer({ children }) {
  return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
  Root: styled(ColumnFlexWrapper)`
    gap: 42px;
    padding: 20px;
    width: 100%;
  `,
};

export default ExpectedPaymentBottomContainer;
