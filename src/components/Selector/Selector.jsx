import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectorBox = styled.div`
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 28px;
  height: inherit;
  appearance: none;
  border: 1px solid var(--cyan-dark);
  border-radius: 2px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:checked {
    background: var(--cyan-dark);
  }
  &::after {
    content: '✓';
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--white);
  }
`;

const Label = styled.label`
  height: inherit;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
`;

function Selector({ onChange, checked, label }) {
  return (
    <SelectorBox>
      <Checkbox type="checkbox" id="checkbox" onChange={onChange} checked={checked} />
      {label && <Label htmlFor="checkbox">{label}</Label>}
    </SelectorBox>
  );
}

Selector.defaultProps = {
  onChange: () => {},
  checked: false,
  label: '',
};

Selector.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
};

export default Selector;
