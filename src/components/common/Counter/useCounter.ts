interface UseCounterProps {
  count: number;
  onChange: (count: number) => void;
  onBlur: (count: number) => void;
}

const useCounter = ({ count, onChange, onBlur }: UseCounterProps) => {
  const increaseCount = () => {
    if (count >= 99) return;

    onChange(count + 1);
  };

  const decreaseCount = () => {
    if (count <= 1) {
      onBlur(0);
      return;
    }

    onChange(count - 1);
  };

  const updateCount = (count: number) => {
    onChange(count);
  };

  return {
    increaseCount,
    decreaseCount,
    updateCount,
  } as const;
};

export default useCounter;
