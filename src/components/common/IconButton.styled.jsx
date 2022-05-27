import styled from "styled-components";

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const IconButtonImg = styled.img`
  width: ${({ width }) => width};
  &:hover {
    transform: scale(1.05);
  }
`;

export { IconButton, IconButtonImg };
