import styled from "styled-components";

const StyledNavButton = styled.button`
  padding: 0 4px 4px;

  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.white};
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  :hover {
    border-bottom: 2px solid ${({ theme }) => theme.color.white};
  }
`;

export { StyledNavButton };
