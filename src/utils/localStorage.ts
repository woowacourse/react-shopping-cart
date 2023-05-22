export function updateData(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key: string, defaultData = '[]') {
  return JSON.parse(localStorage.getItem(key) || defaultData);
}
