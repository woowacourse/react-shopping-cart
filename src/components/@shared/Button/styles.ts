import styled from "styled-components";

const Button = styled.button`
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.TEAL_400};
  border: none;
  cursor: pointer;
  padding: 10px 25px;

  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
