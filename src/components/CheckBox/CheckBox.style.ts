import { css } from "@emotion/react";

const CheckBoxLayout = css`
  position: relative;
  accent-color: black;
  width: 20px;
  height: 20px;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    background-image: url("./react-shopping-cart/check.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export { CheckBoxLayout };
