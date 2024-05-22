import styled from 'styled-components';
export const OrderButton = styled.button<{ $isOrderable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;

  width: 26.875rem;
  height: 4rem;
  border: none;

  ${(props) => props.theme.typography.label}
  color: ${(props) => props.theme.color.white};

  background-color: ${(props) =>
    props.$isOrderable ? props.theme.color.black : props.theme.color.lightGray};

  cursor: ${(props) => (props.$isOrderable ? 'pointer' : 'default')};
`;
