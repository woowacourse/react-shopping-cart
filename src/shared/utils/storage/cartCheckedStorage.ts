const CHECKED_KEY = 'cart-checked-map';

export const loadCheckedCartMap = (): Set<number> => {
  const stored = localStorage.getItem(CHECKED_KEY);
  const parsed: Record<number, boolean> = stored ? JSON.parse(stored) : {};
  return new Set(Object.keys(parsed).map(Number));
};

export const saveCheckedCartMap = (checkedSet: Set<number>) => {
  const map: Record<number, boolean> = {};
  checkedSet.forEach((id) => {
    map[id] = true;
  });
  localStorage.setItem(CHECKED_KEY, JSON.stringify(map));
};
