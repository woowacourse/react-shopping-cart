import { Coupon } from '../../types/response';

export const getAllCombinations = (arr: Coupon[], max: number): Coupon[][] => {
  const result: Coupon[][] = [];

  const dfs = (start: number, path: Coupon[]) => {
    if (path.length <= max) result.push(path);
    if (path.length === max) return;

    for (let i = start; i < arr.length; i++) {
      dfs(i + 1, [...path, arr[i]]);
    }
  };

  dfs(0, []);
  return result;
};
