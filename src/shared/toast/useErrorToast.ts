import { useEffect, useState } from 'react';
import { subscribeToast } from './toastStore';

export function useErrorToast(): string | null {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToast(setMessage);
    return unsubscribe;
  }, []);

  return message;
}
