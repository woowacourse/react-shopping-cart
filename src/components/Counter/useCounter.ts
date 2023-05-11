const useCounter = (count: number, onChangeCount: (count: number) => void) => {
  const increaseCount = () => {
    if (count >= 99) return;

    onChangeCount(count + 1);
  };

  const decreaseCount = () => {
    if (count <= 0) return;

    onChangeCount(count - 1);
  };

  const updateCount = (count: number) => {
    onChangeCount(count);
  };

  return {
    increaseCount,
    decreaseCount,
    updateCount,
  } as const;
};

export default useCounter;
