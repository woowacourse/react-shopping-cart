import { useState } from "react";

export default function usePersistentSet(
  key: string,
  fallback: Set<string> = new Set()
) {
  let hadInitialValue = false;
  const [value, setValue] = useState<Set<string>>(() => {
    try {
      hadInitialValue = true;
      const raw = localStorage.getItem(key);
      return raw ? new Set<string>(JSON.parse(raw)) : fallback;
    } catch {
      return fallback;
    }
  });

  /** 저장은 호출 측이 필요할 때 직접 수행 */
  const persist = (next: Set<string>) =>
    localStorage.setItem(key, JSON.stringify([...next]));

  return [value, setValue, persist, hadInitialValue] as const;
}
