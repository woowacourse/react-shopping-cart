import { styled } from "styled-components";

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0;
    padding: 18px 15%;

    background: #333333;
  `,

  Logo: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    background-color: transparent;

    cursor: pointer;
  `,

  Title: styled.h1`
    padding-top: 4px;
    letter-spacing: 1px;
    color: #fff;
  `,
};

export default Styled;
