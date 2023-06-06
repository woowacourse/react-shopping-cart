import styled from 'styled-components';

interface CheckBoxProps {
  id: number;
  isChecked: boolean;
  handleClickCheckBox: React.ChangeEventHandler<HTMLInputElement>;
}

export const CheckBox = ({
  isChecked,
  id,
  handleClickCheckBox,
}: CheckBoxProps) => {
  return (
    <>
      <Style.CheckBox isChecked={isChecked} htmlFor={`${id}`}>
        {isChecked && (
          <Style.CheckImage src={`${process.env.PUBLIC_URL}/check.png`} />
        )}
      </Style.CheckBox>
      <Style.HiddenInput
        type="checkbox"
        checked={isChecked}
        onChange={handleClickCheckBox}
        id={`${id}`}
      />
    </>
  );
};

const Style = {
  CheckBox: styled.label<{ isChecked: boolean }>`
    width: 28px;
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #22a6a2;
    background-color: ${(props) => (props.isChecked ? '#333333' : 'white')};
    cursor: pointer;
  `,
  HiddenInput: styled.input`
    display: none;
  `,
  CheckImage: styled.img``,
};
