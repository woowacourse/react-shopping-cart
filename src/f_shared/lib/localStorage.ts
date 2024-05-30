import { AtomEffect } from 'recoil';

// Recoil 상태와 로컬스토리지 동기화 및 무결성 보장
export const localStorageEffect =
  <T>(key: string, validIdsSelector?: any): AtomEffect<T> =>
  ({ setSelf, onSet, getLoadable }) => {
    // 유효한 ID를 로드하는 함수
    const loadValidIds = () => (validIdsSelector ? (getLoadable(validIdsSelector).contents as number[]) : null);

    // Recoil 상태 업데이트
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      const parsedValue = JSON.parse(savedValue);
      const validIds = loadValidIds();
      // 무결성 패치
      if (validIds) {
        const filteredValue = parsedValue.filter((id: number) => validIds.includes(id));
        setSelf(filteredValue);
        localStorage.setItem(key, JSON.stringify(filteredValue));
      } else {
        setSelf(parsedValue);
      }
    }

    // 로컬 스토리지 업데이트
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        const validIds = loadValidIds();
        // 무결성 패치
        if (validIds) {
          const filteredValue = (newValue as any).filter((id: number) => validIds.includes(id));
          localStorage.setItem(key, JSON.stringify(filteredValue));
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      }
    });
  };
