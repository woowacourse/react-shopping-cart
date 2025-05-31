import { ComponentProps } from 'react';
import * as S from './SelectBox.styles';

interface SelectBoxProps {
  isSelected: boolean;
}

function SelectBox({
  isSelected,
  ...props
}: SelectBoxProps & ComponentProps<'button'>) {
  return (
    <S.Container aria-checked={isSelected} isSelected={isSelected} {...props}>
      {isSelected ? (
        <img src="./assets/Check.svg" alt="선택됨" />
      ) : (
        <img src="./assets/Uncheck.svg" alt="선택되지 않음" />
      )}
    </S.Container>
  );
}

export default SelectBox;
