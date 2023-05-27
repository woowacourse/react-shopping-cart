import styled from "styled-components";
import errorImg from "../assets/img/Error.png";
import { useRecoilValue } from "recoil";
import { errorAtom } from "../store/errorState";

const ErrorPage = () => {
  const error = useRecoilValue(errorAtom);

  return (
    <Styled.Container>
      <Styled.Error>
        <Styled.Img loading="lazy" src={errorImg} alt={error.method} />
        <Styled.Title>에러가 발생했어요</Styled.Title>
        <Styled.Message>{error.message}</Styled.Message>
      </Styled.Error>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 100%;
  `,
  Error: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    width: 50%;
    height: 60%;
  `,
  Title: styled.h1`
    font-size: 40px;
    padding-top: 4px;
    letter-spacing: 1px;
    color: #333333;
  `,
  Message: styled.h1`
    font-size: 24px;
    padding-top: 4px;
    letter-spacing: 1px;
    color: #333333;
  `,
  Img: styled.img`
    width: 50%;
    height: 50%;
    min-width: 50%;

    border-radius: 1rem;
  `,
};

export default ErrorPage;
