import { cartListStorage } from '../localStorage';

describe('localStorage 유틸 함수 테스트', () => {
  it('localStorage 데이터가 존재하지 않으면 빈 배열을 반환한다.', () => {
    const result = cartListStorage.get();
    expect(result).toEqual([]);
  });

  it('getLocalStorage 함수는 존재하는 키에 대한 데이터를 반환한다.', () => {
    const value = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'test',
          price: 1000,
          imageUrl: 'test',
          category: 'test',
        },
      },
    ];
    cartListStorage.set(value);
    const result = cartListStorage.get();
    expect(result).toBe(value);
  });

  it('setLocalStorage 함수는 데이터를 저장한다.', () => {
    const value = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'test',
          price: 1000,
          imageUrl: 'test',
          category: 'test',
        },
      },
    ];
    cartListStorage.set(value);
    const result = cartListStorage.get();
    expect(result).toBe(value);
  });

  it('removeLocalStorage 함수는 데이터를 삭제한다.', () => {
    const value = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'test',
          price: 1000,
          imageUrl: 'test',
          category: 'test',
        },
      },
    ];
    cartListStorage.set(value);
    cartListStorage.remove();
    const result = cartListStorage.get();
    expect(result).toEqual([]);
  });
});
