import checkIsBetweenTime from '../../src/utils/checkIsBetweenTime';

describe('현재 시간이 주어진 시간 범위 이내인지 확인하는 함수', () => {
  it('주어진 시간 범위 이내에 현재 시간이 있는 경우 true를 반환한다.', () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 5, 4, 12, 18));
    expect(checkIsBetweenTime(9, 18)).toBeTruthy();
  });

  it('주어진 시간 범위 바깥에 현재 시간이 있는 경우 false를 반환한다.', () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 5, 4, 18, 18));
    expect(checkIsBetweenTime(9, 18)).toBeFalsy();
  });
});
