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
  // console.log(`subscribe called for key: ${key}`);
  // console.log(`Current listeners:`, listeners);
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
  // console.log(`getSnapshot called for key: ${key}`);
  // console.log(`Current store:`, store);
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

export async function refetchData(key: string) {
  const current = store[key];
  if (!current || !current.fetchFn) return null;

  updateData(key, { isLoading: true, isError: false });

  try {
    const result = await current.fetchFn();
    updateData(key, {
      data: result,
      isLoading: false,
      isError: false,
    });
  } catch (error) {
    updateData(key, {
      data: null,
      isLoading: false,
      isError: true,
    });
  }
}
