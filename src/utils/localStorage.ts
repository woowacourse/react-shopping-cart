const store = {
  setStorage(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getStorage(key: string) {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item);
  },

  addItem(key: string, data: unknown) {
    this.setStorage(key, [...this.getStorage(key), data]);
  },
};

export default store;
