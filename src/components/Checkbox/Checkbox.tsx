import checked from '../../assets/checked.svg';
import unchecked from '../../assets/unchecked.svg';
import * as S from './styled';

interface CheckboxProps {
  id: string;
  isChecked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Checkbox = ({ id, isChecked, onClick, disabled }: CheckboxProps) => {
  return (
    <S.CheckboxContainer>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onClick={onClick}
        readOnly
        disabled={disabled}
      />
      <S.CheckboxLabel htmlFor={id}>
        <img src={isChecked ? checked : unchecked} alt="checkbox" />
      </S.CheckboxLabel>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
