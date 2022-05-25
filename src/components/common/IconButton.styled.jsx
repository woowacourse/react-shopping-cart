import styled from "styled-components";

const StyledIconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const StyledIconButtonImg = styled.img`
  width: ${({ width }) => width};
  &:hover {
    transform: scale(1.05);
  }
`;

export { StyledIconButton, StyledIconButtonImg };
