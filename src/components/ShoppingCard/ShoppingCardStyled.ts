import styled from "styled-components";

const Styled = {
  Container: styled.div`
    display: flex;
    width: 100%;
    gap: 15px;
  `,
  Checkbox: styled.input`
    width: 28px;
    height: 28px;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 23px;

    width: 100%;
  `,
  TopSection: styled.section`
    display: flex;
    justify-content: space-between;
  `,
};

export default Styled;
