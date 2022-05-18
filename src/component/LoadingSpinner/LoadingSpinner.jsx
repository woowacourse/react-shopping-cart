import styled from 'styled-components';
import { Spinner } from 'component/@common';
import { FRUITS } from 'constant';

const LoadingSpinnnerBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const FruitIcon = styled.span`
  font-size: 50px;
`;

function LoadingSpinner() {
  return (
    <LoadingSpinnnerBox>
      {FRUITS.map(fruit => (
        <Spinner key={fruit}>
          <FruitIcon>{fruit}</FruitIcon>
        </Spinner>
      ))}
    </LoadingSpinnnerBox>
  );
}

export default LoadingSpinner;
