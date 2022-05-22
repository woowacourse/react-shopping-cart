import styled from "styled-components";
import { css } from "styled-components";

export const SnackBar = styled.div`
  ${({ isSuccess }) => css`
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-bottom: 30px;
    transform: translate(-50%);
    min-width: 300px;
    background-color: ${isSuccess ? "#2ac1bc" : "#ff4040"};
    padding: 15px;
    margin-top: 3px;
    border-radius: 4px;
    opacity: 1;
    animation: fadein 0.5s fadeout 0.5s 2.5s;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    -webkit-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);
    box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);
  `}
`;

export const SnackBarMessage = styled.p`
  font-weight: 600;
  text-align: center;
  color: #fff;
  text-decoration: none;
`;
