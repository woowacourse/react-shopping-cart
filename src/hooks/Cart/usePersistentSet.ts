import { useState } from "react";

export default function usePersistentSet(
  key: string,
  fallback: Set<string> = new Set()
) {
  const [hadInitialValue] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null; // raw가 null이 아니면 저장된 값이 있었다는 뜻
    } catch {
      return false;
    }
  });

  const [value, setValue] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        return new Set<string>(JSON.parse(raw));
      } else {
        return fallback;
      }
    } catch {
      return fallback;
    }
  });

  /** 저장은 호출 측이 필요할 때 직접 수행 */
  const persist = (next: Set<string>) =>
    localStorage.setItem(key, JSON.stringify([...next]));

  return [value, setValue, persist, hadInitialValue] as const;
}
