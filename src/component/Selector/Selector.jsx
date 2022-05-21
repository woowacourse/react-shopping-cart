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
  border: 1px solid #22a6a2;
  border-radius: 2px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:checked {
    background: #22a6a2;
  }
  &::after {
    content: '✓';
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
  }
`;

const Label = styled.label`
  height: inherit;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
`;

function Selector({ label }) {
  return (
    <SelectorBox>
      <Checkbox type="checkbox" id="checkbox" />
      {label && <Label htmlFor="checkbox">{label}</Label>}
    </SelectorBox>
  );
}

Selector.defaultProps = {
  label: '',
};

Selector.propTypes = {
  label: PropTypes.string,
};

export default Selector;
