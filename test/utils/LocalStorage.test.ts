import LocalStorage from '../../src/utils/LocalStorage';

describe('LocalStorage 유틸 함수 객체 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('객체를 로컬 스토리지 내에 넣고 불러올 수 있다.', () => {
    const key = 'testObject';
    const value = { name: '밍고', type: 'FE' };

    LocalStorage.setJSON(key, value);
    const result = LocalStorage.getJSON<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('배열을 로컬 스토리지 내에 넣고 불러올 수 있다.', () => {
    const key = 'testArray';
    const value = [1, 2, 3, 4];

    LocalStorage.setJSON(key, value);
    const result = LocalStorage.getJSON<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('로컬 스토리지 내에 없는 키를 불러오면 null을 반환한다.', () => {
    const result = LocalStorage.getJSON<string>('로컬 스토리지 내에 없는 키');
    expect(result).toBeNull();
  });

  it('중복된 키에 값을 넣으면 값이 덮어씌워진다.', () => {
    const key = 'duplicateKey';
    const firstValue = { data: 1 };
    const secondValue = { data: 2 };

    LocalStorage.setJSON(key, firstValue);
    LocalStorage.setJSON(key, secondValue);

    const result = LocalStorage.getJSON<typeof secondValue>(key);
    expect(result).toEqual(secondValue);
  });
});
