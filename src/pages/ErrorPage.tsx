import styled from '@emotion/styled';

const ErrorPage = () => {
  return (
    <>
      <S.content>
        <S.ErrorImage src="./error-image.png" alt="에러 이미지" />
        <S.description>404! 잘못된 URL 접근입니다.</S.description>
      </S.content>
    </>
  );
};

export default ErrorPage;

const S = {
  content: styled.div`
    padding: 24px;
    display: flex;
    height: 100vh;
    gap: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ErrorImage: styled.img`
    user-select: none;
  `,

  description: styled.p`
    font-size: 24px;
  `,
};
