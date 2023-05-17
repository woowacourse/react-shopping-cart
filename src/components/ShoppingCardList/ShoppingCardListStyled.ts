import styled from "styled-components";

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Quantity: styled.h3`
    font-size: 18px;

    letter-spacing: 0.5px;
  `,
  ListContainer: styled.div`
    width: 58%;
    max-height: 580px;
    overflow-y: auto;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2f3542;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }

    &::-webkit-scrollbar-track {
      background-color: #808080;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px #fff;
    }
  `,
  List: styled.ul`
    padding-right: 10px;
    box-sizing: border-box;
    width: 100%;
  `,
  Border: styled.hr`
    width: 58%;
    height: 2px;

    background-color: #aaaaaa;
  `,
};

export default Styled;
