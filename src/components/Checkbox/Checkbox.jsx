import styled from 'styled-components';
import PropTypes from 'prop-types';

const Checkbox = ({ name, checked, onChange }) => {
  return (
    <Styled.CheckboxWrapper>
      <Styled.Checkbox
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={name}
      />
      <Styled.CheckboxLabel htmlFor={name}>{name}</Styled.CheckboxLabel>
    </Styled.CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

const Styled = {
  CheckboxWrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  Checkbox: styled.input`
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:checked {
      background-color: #2ac1bc;
    }
    &::after {
      box-sizing: border-box;
      content: '✔';
      width: 25px;
      height: 25px;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,

  CheckboxLabel: styled.label`
    padding-left: 7px;
  `,
};

export default Checkbox;
