import styled from 'styled-components';
import Button from '../Button';

export default function Counter({ count, onUPClick, onDownClick }) {
  return (
    <Styled.CounterBox>
      <Styled.Count>{count}</Styled.Count>
      <Styled.CounterButtonBox>
        <Button onClick={onUPClick}>
          <Styled.CounterButtonContent>
            <img src="up.svg" alt="count-up" />
          </Styled.CounterButtonContent>
        </Button>
        <Button onClick={onDownClick}>
          <Styled.CounterButtonContent>
            <img src="down.svg" alt="count-down" />
          </Styled.CounterButtonContent>
        </Button>
      </Styled.CounterButtonBox>
    </Styled.CounterBox>
  );
}

const Styled = {
  CounterBox: styled.div`
    display: flex;

    font-weight: 400;
    font-size: 24px;
    line-height: 19px;
  `,

  Count: styled.div`
    width: 73px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dddddd;
  `,

  CounterButtonBox: styled.div`
    display: flex;
    flex-direction: column;
  `,

  CounterButtonContent: styled.div`
    width: 42px;
    height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid #dddddd;
  `,
};
