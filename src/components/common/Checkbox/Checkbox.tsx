import * as S from './Checkbox.style';

import CHECK_TRUE from '../../../assets/check-true.svg';
import CHECK_FALSE from '../../../assets/check-false.svg';

interface CheckboxProp {
  state: boolean;
  handleClick: () => void;
}

const Checkbox = ({ state, handleClick }: CheckboxProp) => {
  return <S.Checkbox src={state ? CHECK_TRUE : CHECK_FALSE} onClick={handleClick} />;
};

export default Checkbox;
