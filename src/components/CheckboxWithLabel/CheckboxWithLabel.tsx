import Checkbox from '../common/Checkbox/Checkbox';
import * as S from './CheckboxWithLabel.style';
import Text from '../common/Text/Text';

interface CheckboxWithLabelProps {
  labelText: string;
  isChecked: boolean;
  onClick: () => void;
}
const CheckboxWithLabel = ({ labelText, isChecked, onClick }: CheckboxWithLabelProps) => {
  return (
    <S.Label>
      <S.Container>
        <Checkbox state={isChecked} handleClick={onClick} />
        <Text size="s" weight="m">
          {labelText}
        </Text>
      </S.Container>
    </S.Label>
  );
};

export default CheckboxWithLabel;
