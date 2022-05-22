import styled from 'styled-components';

export default function CheckBox({ description, checked, onCheckChange }) {
  return (
    <Styled.Description>
      <Styled.CheckInput type="checkbox" onChange={onCheckChange} checked={checked} />
      {description}
    </Styled.Description>
  );
}

CheckBox.defaultProps = {
  description: '',
};

const Styled = {
  CheckInput: styled.input`
    width: 28px;
    height: 28px;
  `,

  Description: styled.label`
    display: flex;
    align-items: center;
    gap: 10px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;

    color: #333333;
  `,
};
