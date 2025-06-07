type Data<T> = {
  data: T;
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

export function updateData<T>(key: string, newValue: Data<T>) {
  store[key] = newValue;

  listeners[key]?.forEach((cb) => cb());
}

export async function refetchData(key: string) {
  const data = store[key];
  if (!data) return null;

  if (!data.fetchFn) return null;

  try {
    const result = await data.fetchFn();
    updateData(key, {
      data: result,
      fetchFn: data.fetchFn,
    });
  } catch (error) {
    updateData(key, {
      data: null,
      fetchFn: data.fetchFn,
    });
  }

  return store[key].data;
}
