import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  height: 2.5rem;
  align-items: center;
`;

export const Input = styled.input.attrs(({ quantity }) => ({
  type: 'number',
  name: 'quantity-input',
  value: quantity,
  readOnly: true,
}))`
  border-top: 1px solid var(--color-grey-50);
  border-left: 1px solid var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-50);
  border-right: 0;

  text-align: center;
  width: 4rem;
  font-size: var(--font-small);
  height: 100%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &:focus {
    outline: 0;
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 2rem;
  height: 100%;

  & > button {
    height: 50%;
    border: 1px solid var(--color-grey-50);
    font-size: 0.4rem;

    &:first-child {
      border-bottom: 0;
    }
  }
`;
