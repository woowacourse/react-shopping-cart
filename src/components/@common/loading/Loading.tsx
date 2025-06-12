import * as S from "./Loading.styles";

const Loading = () => {
  return (
    <div css={S.loadingContainer}>
      <img src="/loading-spinner.gif" alt="loading" />
    </div>
  );
};

export default Loading;
