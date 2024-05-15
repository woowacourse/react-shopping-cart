import Checkbox from '../Checkbox/Checkbox';
import * as S from './styled';

interface SelectAllProps {
  isSelectAll: boolean;
  onSelectAllClick: () => void;
}

const SelectAll = ({ isSelectAll, onSelectAllClick }: SelectAllProps) => {
  return (
    <S.Container>
      <Checkbox isChecked={isSelectAll} onClick={onSelectAllClick} />
      <S.SelectAllLabel>전체선택</S.SelectAllLabel>
    </S.Container>
  );
};

export default SelectAll;
