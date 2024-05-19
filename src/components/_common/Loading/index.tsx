import * as S from "./styled";
import loading from "../../../assets/images/loading.png";

const Loading = () => {
  return (
    <S.Wrapper>
      <S.Loading src={loading} alt="loading image" />
    </S.Wrapper>
  );
};

export default Loading;
