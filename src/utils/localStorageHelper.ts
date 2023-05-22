const localStorageHelper = {
  hasKey: (key: string) => Boolean(localStorage.getItem(key)),

  getValue<T>(key: string): T {
    if (!this.hasKey(key)) throw new Error('[ERROR] 초기값을 먼저 설정해주세요.');
    return JSON.parse(localStorage.getItem(key) as string);
  },

  setValue: <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  setInitValue: <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export default localStorageHelper;
