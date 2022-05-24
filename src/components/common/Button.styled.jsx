import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};

  font-size: ${({ fontSize }) => fontSize || "1rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "400"};
  color: ${({ theme, color }) =>
    theme.color[color] || color || theme.color.grey_700};

  border: ${({ borderStyle }) => borderStyle || "none"};
  border-color: ${({ theme, borderColor }) =>
    theme.color[borderColor] || borderColor || "transparent"};
  background-color: ${({ theme, bgColor }) =>
    theme.color[bgColor] || bgColor || "transparent"};

  cursor: pointer;
  :hover {
    opacity: 0.95;
  }
`;

export { StyledButton };
