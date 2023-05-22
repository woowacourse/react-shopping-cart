const LocalStorage = {
  setItem: (key: string, item: unknown) => {
    localStorage.setItem(key, JSON.stringify(item));
  },

  getItem: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
};

export default LocalStorage;
