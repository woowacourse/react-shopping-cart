import EmptyCheckbox from "/empty-check.svg";
import FilledCheckbox from "/filled-check.svg";
import * as S from "./Checkbox.styles";

interface Props {
  checked: boolean;
}

const Checkbox = ({ checked }: Props) => {
  return (
    <S.Checkbox>
      {checked ? (
        <img src={FilledCheckbox} alt="filled-checkbox" />
      ) : (
        <img src={EmptyCheckbox} alt="empty-checkbox" />
      )}
    </S.Checkbox>
  );
};

export default Checkbox;
