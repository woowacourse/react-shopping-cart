import styled from "styled-components";
import { skeletonAnimation } from "../../../styles/GlobalStyle";

const Styled = {
  Img: styled.img`
    width: ${(props) => props.theme.width};
    height: ${(props) => props.theme.height};
    min-width: ${(props) => props.theme.height};

    cursor: pointer;

    border-radius: 1rem;
    background: linear-gradient(
      120deg,
      #e5e5e5 30%,
      #f0f0f0 38%,
      #f0f0f0 40%,
      #e5e5e5 48%
    );
    background-size: 400px;
    background-position: 100% 0;
    animation: ${skeletonAnimation} 1s infinite;
  `,
};

Styled.Img.defaultProps = {
  theme: {
    width: "282px",
    height: "282px",
  },
};

export default Styled;
