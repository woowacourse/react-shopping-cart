import styled from "styled-components";

const Styled = {
  Price: styled.span`
    align-self: ${(props) => props.theme.alignSelf};

    font-weight: ${(props) => props.theme.fontWeight};
    font-size: ${(props) => props.theme.fontSizes};

    letter-spacing: 0.5px;
  `,
};

Styled.Price.defaultProps = {
  theme: {
    alignSelf: "auto",
    fontWeight: "Regular",
    fontSize: "20px",
  },
};
export default Styled;
