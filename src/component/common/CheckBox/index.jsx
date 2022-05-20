import styled from 'styled-components';

export default function CheckBox({ description, checked, onCheckChange }) {
  return (
    <Description>
      <CheckInput type="checkbox" onChange={onCheckChange} checked={checked} />
      {description}
    </Description>
  );
}

CheckBox.defaultProps = {
  description: '',
};

const CheckInput = styled.input`
  width: 28px;
  height: 28px;
`;

const Description = styled.label`
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
`;
