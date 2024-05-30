export function getPermutations<T>(array: T[]): T[][] {
  return array.reduce<T[][]>((result, _, index) => {
    if (index === 0) {
      return array.map((item) => [item]);
    }

    const permutations: T[][] = [];

    result.forEach((currentNumber) => {
      array.forEach((item) => {
        if (!currentNumber.includes(item)) {
          permutations.push([...currentNumber, item]);
        }
      });
    });

    return permutations;
  }, []);
}
