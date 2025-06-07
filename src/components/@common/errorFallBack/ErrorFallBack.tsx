import Button from "../../@common/button/Button";
import * as S from "./ErrorFallBack.styles";
import errorFallbackImage from "/public/error.png";

interface ErrorFallbackProps {
  errorButtonText: string;
  callBack: () => void;
}

const ErrorFallback = ({ errorButtonText, callBack }: ErrorFallbackProps) => {
  const closeErrorFallback = () => {
    callBack();
  };

  return (
    <div css={S.errorFallbackContainer} data-testid="error-fallback">
      <img
        css={S.errorFallbackImage}
        src={errorFallbackImage}
        alt="errorFallback"
      />
      <p css={S.errorFallbackMessage}>예기치 못한 에러가 발생했어요.</p>
      <Button size="large" color="black" onClick={closeErrorFallback}>
        {errorButtonText}
      </Button>
    </div>
  );
};

export default ErrorFallback;
