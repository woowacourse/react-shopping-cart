import Checkbox from '@components/common/Checkbox/Checkbox';
import * as S from './styled';

interface SelectAllProps {
  isSelectAll: boolean;
  onSelectAllClick: () => void;
}

const SelectAll = ({ isSelectAll, onSelectAllClick }: SelectAllProps) => {
  return (
    <S.Container>
      <Checkbox id={0} isChecked={isSelectAll} onChange={onSelectAllClick} />
      <S.SelectAllLabel>전체선택</S.SelectAllLabel>
    </S.Container>
  );
};

export default SelectAll;
