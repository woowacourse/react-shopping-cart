import * as S from "./styled";
import loading from "../../../assets/images/loading.png";

const Loading = () => {
  return (
    <S.Container>
      <S.Loading src={loading} alt="loading image" />
    </S.Container>
  );
};

export default Loading;
