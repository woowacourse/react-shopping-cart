import { styled } from 'styled-components';

const NotFound = () => {
  return (
    <S.Wrapper>
      <S.ImgWrapper
        src="https://img.insight.co.kr/static/2020/11/10/700/img_20201110143156_pym2xdy6.webp"
        alt="wrong-way"
      />
      <h1>존재하지 않는 페이지입니다.</h1>
      <br />
      <span>
        <a href="https://regularpark.github.io/react-shopping-cart/">홈페이지</a>로 돌아가기
      </span>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    height: 100vh;
  `,

  ImgWrapper: styled.img`
    border-radius: 10px;
  `,
};

export default NotFound;
