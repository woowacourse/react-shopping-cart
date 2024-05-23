import * as C from "js-combinatorics";

export const getPermutations = <T>(array: T[]): T[][] => {
  return C.Permutation.of(array).toArray() as T[][];
};
