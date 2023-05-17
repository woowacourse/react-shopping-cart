import { styled } from 'styled-components';

const CheckBox = () => {
  return <CheckBoxInput type="checkbox" />;
};

const CheckBoxInput = styled.input`
  background: #bb2d2d;
  border: 1px solid #F47C7C;
  border-radius: 2px;
`;

export default CheckBox;
