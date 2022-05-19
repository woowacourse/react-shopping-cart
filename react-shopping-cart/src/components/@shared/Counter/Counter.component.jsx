import styled from 'styled-components';
import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper.component';
import Text from 'components/@shared/Text/Text.component';
import Button from 'components/@shared/Button/Button.component';
import { ReactComponent as CounterArrow } from 'assets/images/counterArrow.svg';

const Container = styled(FlexWrapper)`
  width: fit-content;
`;

const CounterText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.PALETTE.GRAY_003};
`;

const CounterButton = styled(Button)`
  width: 42px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.PALETTE.GRAY_003};
  cursor: pointer;
`;

function Counter({ handleClickIncrease, handleClickDecrease, style, children }) {
  return (
    <Container style={style}>
      <CounterText fontSize="large">{children}</CounterText>
      <FlexWrapper isColumnDirection={true}>
        <CounterButton onClick={handleClickIncrease}>
          <CounterArrow />
        </CounterButton>
        <CounterButton onClick={handleClickDecrease}>
          <CounterArrow style={{ transform: 'rotate(180deg)' }} />
        </CounterButton>
      </FlexWrapper>
    </Container>
  );
}

export default Counter;
