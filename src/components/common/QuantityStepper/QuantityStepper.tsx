import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  label: string;
}
const QuantityStepper = forwardRef<
  Readonly<{ quantity: number }>,
  QuantityStepperProps
>(({ label }, ref) => {
  const quantityRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useImperativeHandle(
    ref,
    () => ({
      get quantity() {
        return Number(quantityRef.current!.value);
      },
    }),
    []
  );

  return (
    <Flex>
      <Button size="S" view="white" onClick={decrease}>
        ▼
      </Button>
      <S.Quantity ref={quantityRef} value={quantity} disabled name={label} />
      <Button size="S" view="white" onClick={increase}>
        ▲
      </Button>
    </Flex>
  );
});

export default QuantityStepper;
