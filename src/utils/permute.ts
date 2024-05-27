const permute = <T>(arr: T[]): T[][] => {
  if (arr.length === 0) return [];
  if (arr.length === 1) return [arr];

  const permutations: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = permute(arr.slice(0, i).concat(arr.slice(i + 1)));

    rest.forEach((subPerm) => {
      permutations.push([arr[i]].concat(subPerm));
    });
  }

  return permutations;
};

export default permute;
