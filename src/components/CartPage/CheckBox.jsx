import styled from 'styled-components';
import PropType from 'prop-types';

function CheckBox({ checked }) {
  return <Styled.CheckBox type="checkbox" name="checkbox" checked={checked} />;
}

export default CheckBox;

CheckBox.propTypes = {
  checked: PropType.bool,
};

CheckBox.defaultProps = {
  checked: false,
};

const Styled = {
  CheckBox: styled.input`
    appearance: none;
    border: 1px solid #22a6a2;
    border-radius: 2px;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:checked {
      background-color: #22a6a2;
    }

    &:after {
      content: '✔';
      width: 100%;
      height: 100%;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};
