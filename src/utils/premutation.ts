export const getPermutations = <T>(arr: T[]): T[][] => {
  if (arr.length <= 1) return [arr];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutations = getPermutations(rest);
    for (const p of permutations) {
      result.push([arr[i], ...p]);
    }
  }

  return result;
};
