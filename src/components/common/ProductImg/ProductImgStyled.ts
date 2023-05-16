import styled from "styled-components";

const Styled = {
  Img: styled.img`
    width: ${(props) => props.theme.width};
    height: ${(props) => props.theme.height};

    cursor: pointer;
  `,
};

Styled.Img.defaultProps = {
  theme: {
    width: "282px",
    height: "282px",
  },
};
export default Styled;
