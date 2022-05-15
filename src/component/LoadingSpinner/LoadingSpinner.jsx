import styled from 'styled-components';
import { Spinner } from 'component/common';
import { FRUITS } from 'constant';

const LoadingSpinnnerBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

function LoadingSpinner() {
  return (
    <LoadingSpinnnerBox>
      {FRUITS.map(fruit => (
        <Spinner key={fruit}>
          <span style={{ fontSize: '50px' }}>{fruit}</span>
        </Spinner>
      ))}
    </LoadingSpinnnerBox>
  );
}

export default LoadingSpinner;
