import checkIsOverToday from '../../src/utils/checkIsOverDate';

describe('주어진 날짜가 현재 날짜와 비교해 넘어갔는지 확인하는 함수 테스트', () => {
  jest.useFakeTimers().setSystemTime(new Date(2025, 5, 4));

  it('현재 날짜를 넘은 날짜를 주는 경우 true를 반환한다.', () => {
    expect(checkIsOverToday(2025, 6, 5)).toBeTruthy();
  });

  it.each([3, 4])('현재 날짜를 넘지 않은 날짜(%s일)를 주는 경우 false를 반환한다.', (day) => {
    expect(checkIsOverToday(2025, 6, day)).toBeFalsy();
  });
});
