import styled from '@emotion/styled';

interface CheckBoxProps extends React.ComponentProps<'button'> {
  isChecked: boolean;
}

const CheckBox = ({ isChecked, ...rest }: CheckBoxProps) => {
  return (
    <S.ButtonContainer {...rest} disabled={rest.disabled}>
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

type ButtonContainerProps = {
  disabled?: boolean;
};

const S = {
  ButtonContainer: styled.button<ButtonContainerProps>`
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  `,
  CheckBox: styled.img<CheckBoxProps>`
    background-color: ${({ isChecked }) =>
      isChecked ? '#000000' : 'transparent'};
    border: ${({ isChecked }) =>
      isChecked ? '2px solid #000000' : `2px solid #e6e6e6`};
    border-radius: 8px;
  `,
};
