export class StorageController<T> {
  private key: string;
  private storage: Storage;

  constructor(key: string, storage: Storage) {
    this.key = key;
    this.storage = storage;
  }

  get() {
    const item = this.storage.getItem(this.key);

    if (item) {
      return JSON.parse(item) as T;
    }

    return null;
  }

  set(value: T | ((prev: T) => T)) {
    const newState =
      typeof value === "function"
        ? (value as (prev: T) => T)(this.get() as T)
        : value;
    this.storage.setItem(this.key, JSON.stringify(newState));
  }

  clear() {
    this.storage.removeItem(this.key);
  }
}
