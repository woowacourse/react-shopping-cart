import styled from "styled-components";

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 58px;
  `,
  Title: styled.h2`
    font-size: 28px;
    text-align: center;

    letter-spacing: 0.5px;
  `,

  Border: styled.hr`
    width: 100%;
    height: 2px;

    background-color: #333333;
  `,
};

export default Styled;
