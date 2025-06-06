import { isEqual } from "./compare";

describe("compare", () => {
  describe("isEqual", () => {
    it("두 배열이 동일한 요소를 가지고 있다면 true를 반환한다.", () => {
      const array1 = [1, 2, 3];
      const array2 = [1, 2, 3];
      expect(isEqual(array1, array2)).toBeTruthy();
    });

    it("두 배열이 동일한 요소를 가지고 있지 않다면 false를 반환한다.", () => {
      const array1 = [1, 2, 3];
      const array2 = [1, 2, 4];
      expect(isEqual(array1, array2)).toBeFalsy();
    });
  });
});
