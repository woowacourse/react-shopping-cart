const LocalStorage = {
  getData(key: string, id: number) {
    const storage = localStorage.getItem(key) ?? '{}';
    const parseStorage = JSON.parse(storage);

    return parseStorage[id] === undefined ? null : parseStorage[id];
  },

  addData(key: string, id: number | string, value: string | boolean | number) {
    const storage = localStorage.getItem(key) ?? '{}';
    const parseStorage = JSON.parse(storage);

    parseStorage[id] = value;
    localStorage.setItem(key, JSON.stringify(parseStorage));
  },
};

export default LocalStorage;
