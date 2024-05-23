import styled from 'styled-components';

export const SelectCouponItem = styled.li<{ disabled: boolean }>`
  list-style: none;

  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;

  ${({ disabled }) => {
    if (disabled) {
      return 'opacity: 24%';
    }
    return '';
  }}
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
