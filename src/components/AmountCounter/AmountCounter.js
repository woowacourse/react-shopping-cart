import PropTypes from 'prop-types';
import { Container, Input, Nav, ArrowContainer, ArrowUp, ArrowDown } from './AmountCounter.styles';

const AmountCounter = ({ min, max, onChange, value, onClickUp, onClickDown }) => (
  <Container>
    <Input type="number" min={min} max={max} onChange={onChange} value={value} />
    <Nav>
      <ArrowContainer onClick={onClickUp}>
        <ArrowUp />
      </ArrowContainer>
      <ArrowContainer onClick={onClickDown}>
        <ArrowDown />
      </ArrowContainer>
    </Nav>
  </Container>
);

AmountCounter.propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onClickUp: PropTypes.func,
  onClickDown: PropTypes.func,
};

// TODO: 상수화
AmountCounter.defaultProps = {
  min: '1',
  max: '20',
  onChange: () => {},
  value: '',
  onClickUp: () => {},
  onClickDown: () => {},
};

export default AmountCounter;
