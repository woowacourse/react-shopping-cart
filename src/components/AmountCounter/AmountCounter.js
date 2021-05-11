import PropTypes from 'prop-types';
import { AMOUNT_COUNT } from '../../constants';
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
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number,
  onClickUp: PropTypes.func,
  onClickDown: PropTypes.func,
};

AmountCounter.defaultProps = {
  min: AMOUNT_COUNT.MIN,
  max: AMOUNT_COUNT.MAX,
  onChange: () => {},
  value: 1,
  onClickUp: () => {},
  onClickDown: () => {},
};

export default AmountCounter;
