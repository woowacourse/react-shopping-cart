import styled from 'styled-components';
import { CheckboxInput } from './CartItem.styles';

export const Wrapper = styled.div`
  width: 660px;
  margin-top: 36px;

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
    }
  }
`;

export const CartContainerWrapper = styled.div`
  width: 660px;
  border-top: 2px solid #aaaaaa;
  margin-top: 16px;
`;

export const TotalCheckboxInput = styled(CheckboxInput)`
  margin: 0 8px 0 0;
`;

export const TotalCheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;
