import checked from '../../assets/checked.svg';
import unchecked from '../../assets/unchecked.svg';
import * as S from './styled';

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}

const Checkbox = ({ isChecked, onClick }: CheckboxProps) => {
  return (
    <S.Button type="button" onClick={onClick}>
      {isChecked ? <S.Image src={checked} alt="" /> : <S.Image src={unchecked} alt="" />}
    </S.Button>
  );
};

export default Checkbox;
