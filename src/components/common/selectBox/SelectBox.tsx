import * as S from './SelectBox.styles';

interface SelectBoxProps {
  isSelected: boolean;
}

function SelectBox({ isSelected }: SelectBoxProps) {
  return (
    <S.Container isSelected={false}>
      {isSelected ? (
        <img src="./assets/Check.svg" />
      ) : (
        <img src="./assets/Uncheck.svg" />
      )}
    </S.Container>
  );
}

export default SelectBox;
