import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

const QuantityInput = ({ quantity, onChange }: { quantity: number; onChange: () => void }) => {
  return <StyledRoot onChange={onChange}>{quantity}</StyledRoot>;
};

const StyledRoot = styled.div`
  ${flexCenter}

  font-size: 24px;
  grid-area: qp;
  width: 73px;
  height: 60px;
  border: solid grey 1px;
`;

export default QuantityInput;
