import { CheckedMap } from "../types/CheckMap";

export const LOCAL_STORAGE_KEY = "CheckedItems";

export const mapToObj = (map: CheckedMap): Record<number, boolean> => {
  const obj: Record<number, boolean> = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

export const objToMap = (obj: Record<number, boolean>): CheckedMap => {
  return new Map(Object.entries(obj).map(([key, val]) => [Number(key), val]));
};

export const saveCheckedMapToStorage = (map: CheckedMap) => {
  const obj = mapToObj(map);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj));
};

export const loadCheckedMapFromStorage = (): CheckedMap => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return new Map();
  try {
    const parsed = JSON.parse(stored);
    return objToMap(parsed);
  } catch {
    return new Map();
  }
};
