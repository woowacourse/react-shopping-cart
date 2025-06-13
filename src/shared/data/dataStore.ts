type Data<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  fetchFn?: () => Promise<T>;
};

type Store = Record<string, Data<unknown>>;
type Listener = () => void;

const store: Store = {};
const listeners: Record<string, Set<Listener>> = {};

export function subscribe(key: string, callback: Listener) {
  if (!listeners[key]) {
    listeners[key] = new Set();
  }
  if (!listeners[key].has(callback)) {
    listeners[key].add(callback);
  }

  return () => {
    listeners[key]?.delete(callback);
  };
}

export function getSnapshot<T>(key: string) {
  return store[key] as Data<T>;
}

export function updateData<T>(key: string, newValue: Partial<Data<T>>) {
  const prev = store[key] as Data<T>;

  store[key] = {
    ...prev,
    ...newValue,
  };

  listeners[key]?.forEach((cb) => cb());
}

export async function refetchData<T>(
  key: string,
  options?: {
    fetchFn?: () => Promise<T>;
    onSuccess?: () => void;
    onError?: () => void;
  }
) {
  const storeItem = store[key] as Data<T> | undefined;

  const finalFetchFn = options?.fetchFn ?? storeItem?.fetchFn;

  if (!finalFetchFn) return null;

  updateData(key, { isLoading: true, isError: false });

  try {
    const result = await finalFetchFn();
    updateData(key, {
      data: result,
      isLoading: false,
      isError: false,
      fetchFn: finalFetchFn,
    });
    options?.onSuccess?.();
    return result;
  } catch (error) {
    updateData(key, {
      data: null,
      isLoading: false,
      isError: true,
    });
    options?.onError?.();
    return null;
  }
}
