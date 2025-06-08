import styled from '@emotion/styled';

interface CheckBoxProps extends React.ComponentProps<'button'> {
  isChecked: boolean;
}

const CheckBox = ({ isChecked, ...rest }: CheckBoxProps) => {
  return (
    <S.ButtonContainer {...rest}>
      {isChecked ? (
        <S.CheckBox
          isChecked={isChecked}
          src="./checked-box.svg"
          alt="checkedBox"
          data-testid="checkBox"
        />
      ) : (
        <S.CheckBox
          isChecked={isChecked}
          src="./unchecked-box.svg"
          alt="unCheckedBox"
          data-testid="checkBox"
        />
      )}
    </S.ButtonContainer>
  );
};

export default CheckBox;

const S = {
  ButtonContainer: styled.button``,
  CheckBox: styled.img<CheckBoxProps>`
    cursor: pointer;
    background-color: ${({ isChecked }) =>
      isChecked ? '#000000' : 'transparent'};
    border: ${({ isChecked }) =>
      isChecked ? '2px solid #000000' : `2px solid #e6e6e6`};
    border-radius: 8px;
  `,
};
