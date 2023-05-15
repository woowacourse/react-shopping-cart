import { isNotNumber } from '@utils/common';

describe('유틸에 관한 함수 테스트', () => {
  test('숫자가 아닌 문자가 있다면 false가 나오는 지 테스트', () => {
    const word = 'qqq2';

    const result = isNotNumber(word);

    expect(result).toBe(true);
  });
});
