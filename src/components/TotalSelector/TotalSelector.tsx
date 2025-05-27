import Checkbox from "../Checkbox/Checkbox";
import Description from "../Description/Description";
import * as S from "./TotalSelector.styles";

interface Props {
  checked: boolean;
}

const TotalSelector = ({ checked }: Props) => {
  return (
    <S.TotalSelector>
      <Checkbox checked={checked} />
      <Description>전체 선택</Description>
    </S.TotalSelector>
  );
};

export default TotalSelector;
