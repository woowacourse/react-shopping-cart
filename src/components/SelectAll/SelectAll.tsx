import Checkbox from '../Checkbox/Checkbox';
import * as S from './styled';

interface SelectAllProps {
  isSelectAll: boolean;
}

const SelectAll = ({ isSelectAll }: SelectAllProps) => {
  return (
    <S.Container>
      <Checkbox id={1} isChecked={isSelectAll} />
      <S.SelectAllLabel>전체선택</S.SelectAllLabel>
    </S.Container>
  );
};

export default SelectAll;
