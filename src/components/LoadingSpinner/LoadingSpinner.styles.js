import styled from 'styled-components';

const LoadingSpinnner = styled.div`
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

export { LoadingSpinnner, FruitIcon };
