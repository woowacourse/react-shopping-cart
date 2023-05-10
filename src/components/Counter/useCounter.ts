import { isNumber } from '../../utils/isNumber';

const useCounter = (count: number, onChangeCount: (count: number) => void) => {
  const increaseCount = () => {
    if (count >= 99) return;

    onChangeCount(count + 1);
  };

  const decreaseCount = () => {
    if (count <= 0) return;

    onChangeCount(count - 1);
  };

  const handleCountChange = (value: string) => {
    if (!isNumber(value)) return;

    onChangeCount(Number(value));
  };

  return {
    increaseCount,
    decreaseCount,
    handleCountChange,
  } as const;
};

export default useCounter;
