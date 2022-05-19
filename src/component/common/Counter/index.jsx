import styled from 'styled-components';

const CounterBox = styled.div`
  display: flex;
`;

const Count = styled.div`
  width: 73px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CounterButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CounterButton = styled.button`
  width: 42px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Counter() {
  return (
    <CounterBox>
      <Count>1</Count>
      <CounterButtonBox>
        <CounterButton>
          <img src="up.svg" />
        </CounterButton>
        <CounterButton>
          <img src="down.svg" />
        </CounterButton>
      </CounterButtonBox>
    </CounterBox>
  );
}

export default Counter;
