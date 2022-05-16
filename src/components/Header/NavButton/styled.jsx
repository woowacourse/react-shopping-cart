import styled from "styled-components";

export const UnderlinedButton = styled.button`
  padding: 0 4px 4px;

  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.main};
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  :hover {
    border-bottom: 2px solid ${(props) => props.theme.main};
  }
`;
