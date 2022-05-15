import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 16px 8px;

  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};
  border: none;
  background-color: ${({ theme, bgColor }) =>
    theme.color[bgColor] || theme.color.primary};
  cursor: pointer;

  :hover {
    opacity: 0.95;
  }
`;

export default Button;
