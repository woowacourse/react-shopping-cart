import styled, { keyframes } from "styled-components";
import { COLOR } from "../../constants/style";

const fadeIn = keyframes`
  0%{
    right : -10rem;
    opacity: 0;
  }

  25% {
    right: 2.5rem;
    opacity: 1;
  }

  30% {
    right: 2rem;
  }

  70% {
    right: 2rem;
    
  }

  75%{
    right: 2.5rem;
    opacity: 1;
  }

  100% {
    right: -10rem;
    opacity: 0;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const SnackBar = styled.div`
  position: fixed;
  top: 6rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  background-color: ${({ type }) => type === "error" && COLOR.RED_300};
  padding: 1.5rem;
  font-size: 0.8rem;
  animation: ${fadeIn} 5s ease-in-out;
  z-index: 200;
`;
