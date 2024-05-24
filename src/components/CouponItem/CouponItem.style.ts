import styled from 'styled-components';

export const CouponItemWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  min-height: 106px;

  p {
    ${({ disabled }) => disabled && `color: lightGray;`}
  }
`;
