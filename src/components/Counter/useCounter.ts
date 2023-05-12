const useCounter = (
  count: number,
  onChangeCount: (count: number) => void,
  min = 0,
  max = 99,
) => {
  const increaseCount = () => {
    if (count >= max) return;

    onChangeCount(count + 1);
  };

  const decreaseCount = () => {
    if (count <= min) return;

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
