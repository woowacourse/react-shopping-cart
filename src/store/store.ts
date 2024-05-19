export default class Store {
  private store: Storage;

  constructor(storage: Storage) {
    this.store = storage;
  }

  get<T>(key: string): T | null {
    try {
      const rawData = this.store.getItem(key);
      return rawData ? (JSON.parse(rawData) as T) : null;
    } catch {
      this.store.removeItem(key);
      return null;
    }
  }

  set<T>(key: string, value: NonNullable<T>): void {
    const stringifiedValue = JSON.stringify(value);

    this.store.setItem(key, stringifiedValue);
  }
}
