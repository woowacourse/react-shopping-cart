const isQuotaExceededError = (err: unknown): boolean => {
  if (!(err instanceof DOMException)) {
    return false;
  }

  const code = (err as DOMException & { code?: number }).code;
  return (
    // Chrome 및 대부분의 브라우저: QuotaExceededError의 code는 22
    code === 22 ||
    // Firefox: code는 1014이며 name은 NS_ERROR_DOM_QUOTA_REACHED
    code === 1014 ||
    // 표준 명칭: name이 QuotaExceededError
    err.name === 'QuotaExceededError' ||
    // Firefox 구버전 등에서 발생하는 name 값
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED'
  );
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (err instanceof TypeError) {
      alert('저장할 수 없는 형식입니다.');
    } else if (isQuotaExceededError(err)) {
      alert('현재 사용 가능한 스토리지 공간이 부족합니다.');
    } else {
      alert('예기치 못한 오류가 발생했습니다.');
    }
  }
};

export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) return defaultValue;

    return JSON.parse(storedValue);
  } catch (e) {
    return defaultValue;
  }
}

export const SELECTED_CART_ITEM_IDS = 'selectedCartItemIds';
