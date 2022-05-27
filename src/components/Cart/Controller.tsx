import styled from 'styled-components';
import ControllButton from './ControllButton';
import QuantityInput from './QuantityInput';

const Controller = ({
  id,
  quantity,
  modifyQuantity,
}: {
  id: number;
  quantity: number;
  modifyQuantity: (
    targetId: number,
    type: 'Increase' | 'Decrease' | 'alter',
    quantity: number
  ) => void;
}) => {
  return (
    <QuantityController>
      <IncreaseButton onClick={() => modifyQuantity(id, 'Increase', 1)}>▲</IncreaseButton>
      <DecreaseButton onClick={() => modifyQuantity(id, 'Decrease', 1)}>▼</DecreaseButton>
      <QuantityInput onChange={() => {}} quantity={quantity}></QuantityInput>
    </QuantityController>
  );
};
/*
 */
const QuantityController = styled.div`
  display: grid;
  grid-template-areas:
    ' qp ib'
    'qp db';

  border: solid grey 1px;
`;

const IncreaseButton = styled(ControllButton)`
  grid-area: ib;
`;

const DecreaseButton = styled(ControllButton)`
  grid-area: db;
`;

export default Controller;
