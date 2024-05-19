import * as S from './Checkbox.style';

export interface CheckboxProps {
  checked: boolean;
  handleClick: () => void;
  alt?: string;
}

const Checkbox = ({ checked, handleClick, alt = 'Checkbox' }: CheckboxProps) => {
  return <S.Checkbox checked={checked} onClick={handleClick} alt={alt} type="checkbox" />;
};

export default Checkbox;
