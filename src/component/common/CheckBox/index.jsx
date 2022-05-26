import styled from 'styled-components';
export default function CheckBox({ size, description, checked, onCheckChange }) {
  return (
    <Styled.Description>
      <Styled.CheckInput type="checkbox" onChange={onCheckChange} checked={checked} size={size} />
      {description}
    </Styled.Description>
  );
}

CheckBox.defaultProps = {
  description: '',
  size: 'medium',
};

const sizes = {
  small: {
    width: '14px',
    height: '14px',
  },
  medium: {
    width: '28px',
    height: '28px',
  },
  large: {
    width: '42px',
    height: '42px',
  },
};

const Styled = {
  CheckInput: styled.input`
    ${props => sizes[props.size]}
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
