const STORAGE_KEY = 'selectedCartItemIds';

export function loadSelectedCartItemIds(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function saveSelectedCartItemIds(ids: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    console.error('selectedCartItemIds를 저장하는데 실패하였습니다.');
  }
}

export function clearSelectedCartItemIds() {
  localStorage.removeItem(STORAGE_KEY);
}
