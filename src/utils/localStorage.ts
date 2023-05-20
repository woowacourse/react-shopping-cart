const store = {
  setStorage(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  },

  addItem(key: string, data: unknown) {
    this.setStorage(key, [...this.getStorage(key), data]);
  },
};

export default store;
