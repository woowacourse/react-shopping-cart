import * as S from "./ErrorFallback.styles";

export default function ErrorFallback() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <S.Wrapper>
      <S.Icon>🚨</S.Icon>
      <S.Title>문제가 발생했습니다</S.Title>
      <S.Message>
        예상치 못한 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </S.Message>
      <S.ReloadButton onClick={handleReload}>새로고침</S.ReloadButton>
    </S.Wrapper>
  );
}
