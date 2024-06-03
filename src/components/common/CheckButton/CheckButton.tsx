import * as Styled from './style';
import CheckedBox from '../../assets/CheckedBox.svg';
import UnCheckedBox from '../../assets/UnCheckedBox.svg';

interface CheckButtonProp {
  isSelected: boolean;
  setIsSelected: () => void;
}

const CheckButton = ({ isSelected, setIsSelected }: CheckButtonProp) => {
  return (
    <Styled.CheckButton onClick={() => setIsSelected()}>
      <img
        src={isSelected ? CheckedBox : UnCheckedBox}
        alt={isSelected ? '선택됨' : '선택되지 않음'}
      />
    </Styled.CheckButton>
  );
};

export default CheckButton;
