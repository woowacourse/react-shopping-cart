describe('유틸에 관한 함수 테스트', () => {
  test.each([
    ['qqq2', true],
    ['1234', false],
    ['q2ea', true],
    ['0', false],
    ['1', false],
  ])(
    '%s일 때 %s 결과이다. 숫자가 아닌 문자가 있다면 false가 나와야 한다.',
    (word, expectResult) => {
      const result = isNaN(Number(word));

      expect(result).toBe(expectResult);
    }
  );
});

export {};
