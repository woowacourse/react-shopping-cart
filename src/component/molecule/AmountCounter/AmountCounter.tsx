import {
  Container,
  Input,
  Nav,
  ArrowContainer,
  ArrowUp,
  ArrowDown,
} from './AmountCounter.styles';

interface AmountCounterProps {
  min?: number;
  max?: number;
  value: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClickUp: React.MouseEventHandler<HTMLDivElement>;
  onClickDown: React.MouseEventHandler<HTMLDivElement>;
}

const AmountCounter = ({
  min = 1,
  max = 20,
  onChange = () => {},
  value,
  onClickUp,
  onClickDown,
}: AmountCounterProps) => (
  <Container>
    <Input
      type="number"
      min={min}
      max={max}
      onChange={onChange}
      value={value}
    />
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

export default AmountCounter;
export type { AmountCounterProps };
