import styled from "styled-components";

const Styled = {
  Name: styled.span`
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes};

    letter-spacing: 0.5px;
  `,
};

Styled.Name.defaultProps = {
  theme: {
    fontSize: "16px",
  },
};

export default Styled;
