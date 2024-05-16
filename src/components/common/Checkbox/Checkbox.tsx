import * as S from './Checkbox.style';

import CHECK_TRUE from '../../../assets/check-true.svg';
import CHECK_FALSE from '../../../assets/check-false.svg';

export interface CheckboxProps {
  state: boolean;
  handleClick: () => void;
  alt: string;
}

const Checkbox = ({ state, handleClick, alt = 'Checkbox' }: CheckboxProps) => {
  return <S.Checkbox src={state ? CHECK_TRUE : CHECK_FALSE} onClick={handleClick} alt={alt} />;
};

export default Checkbox;
