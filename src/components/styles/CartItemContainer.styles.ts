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

  @media screen and (max-width: 1120px) {
    max-width: 660px;
    width: 100%;
  }
`;

export const CartContainerWrapper = styled.div`
  width: 660px;
  border-top: 1px solid #aaaaaa;
  margin-top: 16px;

  @media screen and (max-width: 1120px) {
    max-width: 660px;
    width: 100%;
  }
`;

export const TotalCheckboxInput = styled(CheckboxInput)`
  margin: 0 8px 0 0;
`;

export const TotalCheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const EmptyWrapper = styled.div`
  max-width: 660px;
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p:nth-child(1) {
    margin-top: 56px;
  }
`;
