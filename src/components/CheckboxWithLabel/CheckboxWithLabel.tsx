import Text from '../common/Text/Text';
import * as S from './CheckboxWithLabel.style';
import Checkbox from '../common/Checkbox/Checkbox';

interface CheckboxWithLabelProps {
  labelText: string;
  isChecked: boolean;
  onClick: () => void;
}
const CheckboxWithLabel = ({
  labelText,
  isChecked,
  onClick,
}: CheckboxWithLabelProps) => {
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
