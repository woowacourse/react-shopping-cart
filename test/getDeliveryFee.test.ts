import { getDeliveryFee } from '../src/utils/getDeliveryFee';

describe('getDeliveryFee 함수 경계값 테스트', () => {
  it('총 가격이 100,000원 미만이며 도서 산간 체크표시가 true이면 6,000원을 반환한다.', () => {
    expect(getDeliveryFee(true, 99_999)).toBe(6000);
  });

  it('총 가격이 100,000원 미만이며 도서 산간 체크표시가 false이면 3,000원을 반환한다.', () => {
    expect(getDeliveryFee(false, 99_999)).toBe(3000);
  });

  it('총 가격이 100,000원이고 도서 산간 체크표시가 true이면 3,000원을 반환한다.', () => {
    expect(getDeliveryFee(true, 100_000)).toBe(3000);
  });

  it('총 가격이 100,000원이고 도서 산간 체크표시가 false이면 0원을 반환한다.', () => {
    expect(getDeliveryFee(false, 100_000)).toBe(0);
  });

  it('총 가격이 100,000원 이상이고 도서 산간 체크표시가 true이면 3,000원을 반환한다.', () => {
    expect(getDeliveryFee(true, 100_001)).toBe(3000);
  });

  it('총 가격이 100,001원 이상이고 isChecked가 false이면 0원을 반환한다.', () => {
    expect(getDeliveryFee(false, 100_001)).toBe(0);
  });
});
