import { styled } from 'styled-components';

const CheckBox = () => {
  return <CheckBoxInput type="checkbox" />;
};

const CheckBoxInput = styled.input`
  background: #ffffff;
  border: 1px solid #22a6a2;
  border-radius: 2px;
`;

export default CheckBox;
