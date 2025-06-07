import * as S from "../ErrorFallback/ErrorFallback.styles";

export default function LoadingFallback() {
  return (
    <S.Wrapper>
      <S.Icon>⏳</S.Icon>
      <S.Title>로딩 중입니다</S.Title>
      <S.Message>
        데이터를 불러오고 있습니다.
        <br />
        잠시만 기다려 주세요.
      </S.Message>
    </S.Wrapper>
  );
}
