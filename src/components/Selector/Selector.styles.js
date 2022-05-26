import styled from 'styled-components';

const Selector = styled.div`
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 28px;
  height: inherit;
  appearance: none;
  border: 1px solid var(--cyan-dark);
  border-radius: 2px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:checked {
    background: var(--cyan-dark);
  }
  &::after {
    content: '✓';
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--white);
  }
`;

const Label = styled.label`
  height: inherit;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
`;

export { Selector, Checkbox, Label };
