import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../localStorage';

describe('localStorage 유틸 함수 테스트', () => {
  it('getLocalStorage 함수는 존재하는 키에 대한 데이터를 반환한다.', () => {
    const key = 'test';
    const value = 'test';
    setLocalStorage(key, value);
    const result = getLocalStorage(key);
    expect(result).toBe(value);
  });

  it('setLocalStorage 함수는 데이터를 저장한다.', () => {
    const key = 'test';
    const value = 'test';
    setLocalStorage(key, value);
    const result = getLocalStorage(key);
    expect(result).toBe(value);
  });

  it('removeLocalStorage 함수는 데이터를 삭제한다.', () => {
    const key = 'test';
    const value = 'test';
    setLocalStorage(key, value);
    removeLocalStorage(key);
    const result = getLocalStorage(key);
    expect(result).toEqual([]);
  });
});
