/**
 * 주어진 배열의 모든 순열을 생성한다.
 * @param {T[]} arr - 순열을 생성할 배열
 * @returns {T[][]} 입력 배열의 모든 순열을 포함하는 배열
 * @template T
 */
const getPermutations = <T>(arr: T[]): T[][] => {
  const result: T[][] = [];

  /**
   * 배열의 순열을 재귀적으로 생성한다.
   * @param {number} n - 생성할 순열의 길이
   * @param {T[]} heapArr - 현재 순열을 구성하는 배열
   */
  const generate = (n: number, heapArr: T[]) => {
    if (n === 1) {
      result.push([...heapArr]);
      return;
    }

    generate(n - 1, heapArr);

    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) {
        [heapArr[i], heapArr[n - 1]] = [heapArr[n - 1], heapArr[i]];
      } else {
        [heapArr[0], heapArr[n - 1]] = [heapArr[n - 1], heapArr[0]];
      }
      generate(n - 1, heapArr);
    }
  };

  generate(arr.length, arr.slice());
  return result;
};

export default getPermutations;
