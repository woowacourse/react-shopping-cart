import { styled } from 'styled-components';

const CheckBoxContainer = styled.div`
  appearance: none;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  width: 28px;
  height: 28px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;

  :after {
    content: '✔';
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CheckBox = () => {
  return (
    <CheckBoxContainer>
      <label htmlFor="checkbox">
        <Input width="100%" height="100%" name="checkbox" type="checkbox" readOnly />
        {}
      </label>
    </CheckBoxContainer>
  );
};

export default CheckBox;
