import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const ErrorContainer = styled.div`
  width: 100%;
  margin-top: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Jua";
  font-size: 8rem;
  gap: 1em;
`;

export const HomeButton = styled(Link)`
  color: white;
  font-size: 2rem;
  background-color: ${(props) => props.color};
  padding: 1em;
  border-radius: 2em;
  &:hover {
    opacity: 0.8;
  }
`;
