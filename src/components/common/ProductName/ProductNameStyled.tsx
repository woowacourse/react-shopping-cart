import styled from "styled-components";

const Styled = {
  Name: styled.span`
    width: ${(props) => props.theme.width};
    height: ${(props) => props.theme.height};

    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes};

    letter-spacing: 0.5px;

    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  `,
};

Styled.Name.defaultProps = {
  theme: {
    width: "197px",
    height: "42px",
    fontSize: "16px",
  },
};

export default Styled;
