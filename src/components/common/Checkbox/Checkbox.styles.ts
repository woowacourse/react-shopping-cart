import styled from 'styled-components';

const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
  padding: 0;
  display: none;
`;

const CheckboxIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export { CheckboxInput, CheckboxIconWrapper };
