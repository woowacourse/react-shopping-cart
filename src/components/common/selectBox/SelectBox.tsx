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
        <img src="./assets/Check.svg" />
      ) : (
        <img src="./assets/Uncheck.svg" />
      )}
    </S.Container>
  );
}

export default SelectBox;
