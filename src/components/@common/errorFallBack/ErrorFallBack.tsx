import useEasyNavigate from "../../../hooks/useEasyNavigate";
import Button from "../../@common/button/Button";
import * as S from "./ErrorFallBack.styles";
import errorFallbackImage from "/public/error.png";

const ErrorFallback = () => {
  const { goHome } = useEasyNavigate();

  return (
    <div css={S.errorFallbackContainer} data-testid="error-fallback">
      <img
        css={S.errorFallbackImage}
        src={errorFallbackImage}
        alt="errorFallback"
      />
      <p css={S.errorFallbackMessage}>예기치 못한 에러가 발생했어요.</p>
      <Button size="large" color="black" onClick={goHome}>
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default ErrorFallback;
