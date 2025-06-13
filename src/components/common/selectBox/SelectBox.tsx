import { ComponentProps } from 'react';
import * as S from './SelectBox.styles';

interface SelectBoxProps {
  selected: boolean;
}

function SelectBox({
  selected,
  ...props
}: SelectBoxProps & ComponentProps<'button'>) {
  return (
    <S.Container aria-checked={selected} selected={selected} {...props}>
      {selected ? (
        <img src="./assets/Check.svg" alt="선택됨" />
      ) : (
        <img src="./assets/Uncheck.svg" alt="선택되지 않음" />
      )}
    </S.Container>
  );
}

export default SelectBox;
