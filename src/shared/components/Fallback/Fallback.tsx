import * as S from "./Fallback.styled";
import planetLoadingImage from "@assets/images/planet-loading.png";
import planetErrorImage from "@assets/images/planet-error.png";

type FallbackType = "loading" | "error";

type FallbackProps = {
  type: FallbackType;
  message: string;
};

const fallbackImageMap = {
  loading: planetLoadingImage,
  error: planetErrorImage,
};

function Fallback({ type, message }: FallbackProps) {
  return (
    <S.Container>
      <S.FallbackImage
        src={fallbackImageMap[type]}
        alt={type === "loading" ? "콘텐츠 로딩 중" : "오류 발생"}
      />
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}

export default Fallback;
