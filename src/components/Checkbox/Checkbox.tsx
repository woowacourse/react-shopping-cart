import checked from '../../assets/checked.svg';
import unchecked from '../../assets/unchecked.svg';
import * as S from './styled';

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}

const Checkbox = ({ isChecked, onClick }: CheckboxProps) => {
  return <S.Input type="image" onClick={onClick} src={isChecked ? checked : unchecked} />;
};

export default Checkbox;
