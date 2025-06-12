interface LocalStorage {
  setJSON: (key: string, JSONdata: object | unknown[]) => void;
  getJSON: <T>(key: string) => T | null;
}

const LocalStorage: LocalStorage = {
  setJSON(key, JSONdata) {
    localStorage.setItem(key, JSON.stringify(JSONdata));
  },

  getJSON<T>(key: string) {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data) as T;
      return null;
    } catch {
      throw new Error('로컬 스토리지에서 정보를 가져오는 과정에 오류가 발생했습니다.');
    }
  },
};

export default LocalStorage;
