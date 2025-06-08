interface LocalStorage {
  setJSON: (key: string, JSONdata: object | unknown[]) => void;
  getJSON: <T>(key: string) => T | null;
}

const LocalStorage: LocalStorage = {
  setJSON(key, JSONdata) {
    localStorage.setItem(key, JSON.stringify(JSONdata));
  },

  getJSON<T>(key: string) {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data) as T;
    return null;
  },
};

export default LocalStorage;
