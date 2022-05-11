import errorApiImg from 'assets/png/errorApiImg.png';
import styled from 'styled-components';

const ErrorApi = () => {
  return (
    <Styled.Wrapper>
      <Styled.ErrorImg src={errorApiImg} alt="에러이미지" />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ErrorImg: styled.img`
    width: 60%;
  `,
};

export default ErrorApi;
