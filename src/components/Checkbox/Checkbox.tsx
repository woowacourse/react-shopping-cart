import checked from '../../assets/checked.svg';
import unchecked from '../../assets/unchecked.svg';
import * as S from './styled';

interface CheckboxProps {
  id: number;
  isChecked: boolean;
}

const Checkbox = ({ id, isChecked }: CheckboxProps) => {
  return (
    <S.Button type="button">
      {isChecked ? <S.Image src={checked} alt="" /> : <S.Image src={unchecked} alt="" />}
    </S.Button>
  );
};

export default Checkbox;
