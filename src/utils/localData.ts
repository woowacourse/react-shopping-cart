export const LocalData = {
  setDate(dataName: string, data: any) {
    localStorage.setItem(dataName, JSON.stringify(data));
  },

  getData(dataName: string) {
    const localData = localStorage.getItem(dataName);
    return localData && JSON.parse(localData);
  },
};
