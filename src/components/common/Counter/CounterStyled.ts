import { styled } from "styled-components";

const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: ${(props) => props.theme.alignSelf};

    width: ${(props) => props.theme.width};
    height: ${(props) => props.theme.height};

    border: 1px solid grey;
    border-radius: 3px;
    -webkit-box-pack: center;
  `,

  Count: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40%;
    height: 100%;

    border-left: 0.5px solid grey;
    border-right: 0.5px solid grey;
  `,

  Button: styled.button`
    width: 30%;
    height: 100%;

    text-align: center;
    cursor: pointer;
  `,
};

Styled.Container.defaultProps = {
  theme: {
    alignSelf: "auto",
    width: "72px",
    height: "32px",
  },
};
export default Styled;
