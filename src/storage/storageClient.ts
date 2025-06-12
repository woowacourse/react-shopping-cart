const storageClient = {
  storage: window.localStorage,

  getData<T>(key: string): T {
    const data = this.storage.getItem(key) ?? "[]";
    return JSON.parse(data);
  },

  setData<T>(key: string, data: T) {
    const stringifyData = JSON.stringify(data);
    this.storage.setItem(key, stringifyData);
  },
};

export default storageClient;
