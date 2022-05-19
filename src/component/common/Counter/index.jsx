import styled from 'styled-components';
import Button from '../Button';

export default function Counter() {
  return (
    <CounterBox>
      <Count>1</Count>
      <CounterButtonBox>
        <Button>
          <CounterButtonContent>
            <img src="up.svg" />
          </CounterButtonContent>
        </Button>
        <Button>
          <CounterButtonContent>
            <img src="down.svg" />
          </CounterButtonContent>
        </Button>
      </CounterButtonBox>
    </CounterBox>
  );
}

const CounterBox = styled.div`
  display: flex;

  font-weight: 400;
  font-size: 24px;
  line-height: 19px;
`;

const Count = styled.div`
  width: 73px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #dddddd;
`;

const CounterButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CounterButtonContent = styled.div`
  width: 42px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #dddddd;
`;
